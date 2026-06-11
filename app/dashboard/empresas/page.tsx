'use client'

import { useState } from 'react'
import { Building2, FileText, TrendingUp, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

const EMPRESAS_REGISTRADAS = [
  {
    id: 1,
    nombre: 'Exportaciones Cacao Colombia',
    nit: '123456789',
    tamaño: 8,
    estado: 'activo',
    contacto: 'Juan García',
    email: 'juan@cacaocol.com',
    telefono: '+57 300 123 4567',
    creado: '2024-01-15',
  },
  {
    id: 2,
    nombre: 'Productos Marinos del Pacífico',
    nit: '987654321',
    tamaño: 5,
    estado: 'activo',
    contacto: 'María López',
    email: 'maria@marinospac.com',
    telefono: '+57 301 234 5678',
    creado: '2024-02-20',
  },
  {
    id: 3,
    nombre: 'Importadora de Contenedores',
    nit: '456789123',
    tamaño: 15,
    estado: 'activo',
    contacto: 'Carlos Ruiz',
    email: 'carlos@importadora.com',
    telefono: '+57 302 345 6789',
    creado: '2024-03-10',
  },
]

export default function PortalEmpresasPage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    nit: '',
    tamaño: '1',
    contactoNombre: '',
    contactoEmail: '',
    contactoTelefono: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Empresa registrada:', formData)
    setFormData({
      nombreEmpresa: '',
      nit: '',
      tamaño: '1',
      contactoNombre: '',
      contactoEmail: '',
      contactoTelefono: '',
    })
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Portal de Empresas B2B</h1>
        <p className="text-slate-600">Plataforma para registro y gestión de empresas de transporte de mercancías</p>
      </div>

      {/* Registro de Nueva Empresa */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Registrar Nueva Empresa
          </CardTitle>
          <Button
            variant={showForm ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : 'Agregar Empresa'}
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-700 font-medium">Nombre Empresa</Label>
                  <Input
                    type="text"
                    name="nombreEmpresa"
                    value={formData.nombreEmpresa}
                    onChange={handleChange}
                    placeholder="Transportes Marina S.A."
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-slate-700 font-medium">NIT</Label>
                  <Input
                    type="text"
                    name="nit"
                    value={formData.nit}
                    onChange={handleChange}
                    placeholder="123456789"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-slate-700 font-medium">Tamaño Flota</Label>
                  <select
                    name="tamaño"
                    value={formData.tamaño}
                    onChange={handleChange}
                    className="w-full mt-2 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="1">1-5 embarcaciones</option>
                    <option value="2">6-10 embarcaciones</option>
                    <option value="3">11-20 embarcaciones</option>
                    <option value="4">21+ embarcaciones</option>
                  </select>
                </div>

                <div>
                  <Label className="text-slate-700 font-medium">Contacto (Nombre)</Label>
                  <Input
                    type="text"
                    name="contactoNombre"
                    value={formData.contactoNombre}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-slate-700 font-medium">Correo</Label>
                  <Input
                    type="email"
                    name="contactoEmail"
                    value={formData.contactoEmail}
                    onChange={handleChange}
                    placeholder="juan@empresa.com"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label className="text-slate-700 font-medium">Teléfono</Label>
                  <Input
                    type="tel"
                    name="contactoTelefono"
                    value={formData.contactoTelefono}
                    onChange={handleChange}
                    placeholder="+57 300 123 4567"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Registrar Empresa
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Empresas Registradas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Empresas Registradas ({EMPRESAS_REGISTRADAS.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {EMPRESAS_REGISTRADAS.map((empresa) => (
              <div key={empresa.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{empresa.nombre}</h3>
                    <p className="text-sm text-slate-500">NIT: {empresa.nit}</p>
                  </div>
                  <Badge className={empresa.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}>
                    {empresa.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                    <FileText className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="text-xs text-slate-600">Tamaño Flota</div>
                      <div className="font-semibold text-slate-900">{empresa.tamaño} embarcaciones</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                    <TrendingUp className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="text-xs text-slate-600">Registrada</div>
                      <div className="font-semibold text-slate-900">{empresa.creado}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded">
                    <div className="text-xs text-slate-600 mb-1">Contacto</div>
                    <div className="font-semibold text-slate-900 text-sm">{empresa.contacto}</div>
                    <div className="text-xs text-slate-600">{empresa.email}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver detalles
                  </Button>
                  <Button variant="outline" size="sm">
                    Contactar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Información */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="text-2xl">📦</div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Beneficios B2B</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Acceso a red de operadores verificados</li>
                <li>✓ Tarificación preferencial para flotas grandes</li>
                <li>✓ Panel de gestión de envíos y rastreo</li>
                <li>✓ Soporte dedicado para empresas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
