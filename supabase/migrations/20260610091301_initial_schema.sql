
-- Perfiles de usuarios
CREATE TABLE IF NOT EXISTS perfiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre_completo TEXT,
  telefono TEXT,
  puerto_frecuente TEXT,
  avatar_url TEXT,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_profile" ON perfiles FOR SELECT
  TO authenticated USING (auth.uid() = id);
CREATE POLICY "insert_own_profile" ON perfiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own_profile" ON perfiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "delete_own_profile" ON perfiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- Empresas de transporte marítimo
CREATE TABLE IF NOT EXISTS empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nit TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  representante TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefono TEXT,
  descripcion TEXT,
  logo_url TEXT,
  verificada BOOLEAN DEFAULT FALSE,
  activa BOOLEAN DEFAULT TRUE,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  creado_en TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_empresas_public" ON empresas FOR SELECT
  TO anon, authenticated USING (activa = true);
CREATE POLICY "insert_empresas" ON empresas FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "update_own_empresa" ON empresas FOR UPDATE
  TO authenticated USING (auth.uid() = usuario_id) WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "delete_own_empresa" ON empresas FOR DELETE
  TO authenticated USING (auth.uid() = usuario_id);

-- Embarcaciones
CREATE TABLE IF NOT EXISTS embarcaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('lancha-rapida', 'ferry', 'lancha-local', 'panga')),
  capacidad INT NOT NULL,
  velocidad TEXT,
  motor TEXT,
  combustible TEXT,
  anio INT,
  imagen_url TEXT,
  certificada BOOLEAN DEFAULT FALSE,
  activa BOOLEAN DEFAULT TRUE,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE embarcaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_embarcaciones_public" ON embarcaciones FOR SELECT
  TO anon, authenticated USING (activa = true);
CREATE POLICY "insert_embarcaciones" ON embarcaciones FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM empresas WHERE id = empresa_id AND usuario_id = auth.uid())
  );
CREATE POLICY "update_embarcaciones" ON embarcaciones FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM empresas WHERE id = empresa_id AND usuario_id = auth.uid())
  );
CREATE POLICY "delete_embarcaciones" ON embarcaciones FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM empresas WHERE id = empresa_id AND usuario_id = auth.uid())
  );

-- Viajes
CREATE TABLE IF NOT EXISTS viajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origen TEXT NOT NULL,
  destino TEXT NOT NULL,
  fecha DATE NOT NULL,
  hora_salida TIME NOT NULL,
  hora_llegada TIME NOT NULL,
  tipo_embarcacion TEXT NOT NULL,
  nombre_embarcacion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  cupos_disponibles INT NOT NULL,
  cupos_totales INT NOT NULL,
  operador TEXT NOT NULL,
  empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL,
  embarcacion_id UUID REFERENCES embarcaciones(id) ON DELETE SET NULL,
  paradas TEXT[] DEFAULT '{}',
  duracion_minutos INT,
  activo BOOLEAN DEFAULT TRUE,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE viajes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_viajes_public" ON viajes FOR SELECT
  TO anon, authenticated USING (activo = true);
CREATE POLICY "insert_viajes" ON viajes FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM empresas WHERE id = empresa_id AND usuario_id = auth.uid())
    OR auth.uid() IS NOT NULL
  );
CREATE POLICY "update_viajes" ON viajes FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM empresas WHERE id = empresa_id AND usuario_id = auth.uid())
  );
CREATE POLICY "delete_viajes" ON viajes FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM empresas WHERE id = empresa_id AND usuario_id = auth.uid())
  );

-- Reservas
CREATE TABLE IF NOT EXISTS reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  viaje_id UUID NOT NULL REFERENCES viajes(id) ON DELETE CASCADE,
  asientos INT NOT NULL DEFAULT 1,
  precio_total DECIMAL(10,2) NOT NULL,
  asientos_seleccionados TEXT[] DEFAULT '{}',
  codigo TEXT UNIQUE,
  estado TEXT NOT NULL DEFAULT 'confirmada' CHECK (estado IN ('confirmada', 'cancelada', 'completada')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_reservas" ON reservas FOR SELECT
  TO authenticated USING (auth.uid() = usuario_id);
CREATE POLICY "insert_own_reservas" ON reservas FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "update_own_reservas" ON reservas FOR UPDATE
  TO authenticated USING (auth.uid() = usuario_id) WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "delete_own_reservas" ON reservas FOR DELETE
  TO authenticated USING (auth.uid() = usuario_id);

-- Trigger: crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO perfiles (id, nombre_completo, telefono, puerto_frecuente)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'nombre_completo',
    NEW.raw_user_meta_data->>'telefono',
    NEW.raw_user_meta_data->>'puerto_frecuente'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_profile_on_signup();

-- Trigger: generar código de reserva automáticamente
CREATE OR REPLACE FUNCTION generate_reserva_codigo()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    NEW.codigo := 'PC-' || UPPER(SUBSTRING(MD5(NEW.id::TEXT) FROM 1 FOR 6));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_reserva_codigo ON reservas;
CREATE TRIGGER set_reserva_codigo
  BEFORE INSERT ON reservas
  FOR EACH ROW EXECUTE FUNCTION generate_reserva_codigo();

-- Trigger: descontar cupos al confirmar reserva
CREATE OR REPLACE FUNCTION descontar_cupos()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE viajes
  SET cupos_disponibles = cupos_disponibles - NEW.asientos
  WHERE id = NEW.viaje_id AND cupos_disponibles >= NEW.asientos;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'No hay suficientes cupos disponibles';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_reserva_confirmed ON reservas;
CREATE TRIGGER on_reserva_confirmed
  AFTER INSERT ON reservas
  FOR EACH ROW WHEN (NEW.estado = 'confirmada')
  EXECUTE FUNCTION descontar_cupos();

-- Función para devolver cupos al cancelar
CREATE OR REPLACE FUNCTION devolver_cupos(p_viaje_id UUID, p_asientos INT)
RETURNS VOID AS $$
BEGIN
  UPDATE viajes
  SET cupos_disponibles = cupos_disponibles + p_asientos
  WHERE id = p_viaje_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
