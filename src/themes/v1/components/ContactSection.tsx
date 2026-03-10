'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { contact, formConfig } from '@/data/siteData'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const ContactSection = () => {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    const payload = {
      ...formData,
      source: formConfig.source,
      campaign: formConfig.campaign,
      notifyEmails: formConfig.notifyEmails,
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    }

    if (!formConfig.webhookUrl) {
      console.warn('No webhook URL configured. Form data:', payload)
      setStatus('success')
      return
    }

    try {
      const res = await fetch(formConfig.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 bg-[#f1f2f4]">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="bg-white rounded-[12px] shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Contact Info */}
          <div className="md:w-1/3 bg-[#070519] p-12 text-white">
            <h2 className="text-[24px] font-bold mb-12 leading-none">{formConfig.heading}</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="text-white/50 shrink-0" size={24} />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.96px] mb-1 opacity-50">ADDRESS</p>
                  <p className="text-[18px]">{contact.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-white/50 shrink-0" size={24} />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.96px] mb-1 opacity-50">PHONE</p>
                  <a href={`tel:${contact.phone}`} className="text-[18px] hover:text-white/80 transition-colors">{contact.phone}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="text-white/50 shrink-0" size={24} />
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.96px] mb-1 opacity-50">EMAIL</p>
                  <a href={`mailto:${contact.email}`} className="text-[18px] hover:text-white/80 transition-colors">{contact.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-2/3 p-12">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle size={48} className="text-green-500 mb-4" />
                <p className="text-lg font-bold text-black mb-2">Message Sent!</p>
                <p className="text-gray-600">{formConfig.successMessage}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-semibold text-black underline hover:opacity-70"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formConfig.fields.map((field) => {
                    if (!field.halfWidth) return null

                    if (field.type === 'select') {
                      return (
                        <div key={field.name}>
                          <label className="block text-[14px] font-bold text-black mb-2">{field.label}</label>
                          <select
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            required={field.required}
                            className="w-full border border-black/10 rounded-[3px] px-4 py-3 focus:outline-none focus:border-black/30 transition-colors bg-white"
                          >
                            <option value="">{field.placeholder}</option>
                            {field.options?.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      )
                    }

                    return (
                      <div key={field.name}>
                        <label className="block text-[14px] font-bold text-black mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          required={field.required}
                          className="w-full border border-black/10 rounded-[3px] px-4 py-3 focus:outline-none focus:border-black/30 transition-colors"
                        />
                      </div>
                    )
                  })}
                </div>

                {formConfig.fields.filter(f => !f.halfWidth).map((field) => (
                  <div key={field.name}>
                    <label className="block text-[14px] font-bold text-black mb-2">{field.label}</label>
                    <textarea
                      rows={6}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      className="w-full border border-black/10 rounded-[3px] px-4 py-3 focus:outline-none focus:border-black/30 transition-colors resize-none"
                    />
                  </div>
                ))}

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-[3px]">
                    <AlertCircle size={18} />
                    <span className="text-sm">{formConfig.errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-black text-white px-12 py-4 rounded-[3px] font-bold text-[14px] uppercase tracking-[0.7px] hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === 'submitting' && <Loader2 size={16} className="animate-spin" />}
                  {formConfig.submitText}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
