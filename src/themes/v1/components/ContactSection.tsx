import React from 'react'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import { contact, formConfig } from '@/data/siteData'

const ContactSection = () => {
  const firmContactUrl = `${contact.website.replace(/\/$/, '')}/contact-us/`

  return (
    <section id="contact" className="py-24 bg-[#f1f2f4]">
      <div id="form" />
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="bg-white rounded-[12px] shadow-sm overflow-hidden flex flex-col md:flex-row">
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
                  <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-[18px] hover:text-white/80 transition-colors">{contact.phone}</a>
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
          <div className="md:w-2/3 p-12 flex flex-col justify-center">
            <h3 className="text-[28px] md:text-[32px] font-bold text-black mb-4 leading-tight">Free Case Review</h3>
            <p className="text-[16px] text-black/70 mb-8 max-w-lg">
              Talk directly with the {contact.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')} team about your case. Free consultation, no obligation — your case stays with the firm, not the podcast.
            </p>
            <a href={firmContactUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-[3px] font-bold text-[14px] uppercase tracking-[0.7px] hover:bg-black/80 transition-all self-start">
              Contact the Firm
              <ArrowUpRight size={16} />
            </a>
            <p className="text-[12px] text-black/40 mt-4">Opens {firmContactUrl.replace(/^https?:\/\//, '')} in a new tab.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
