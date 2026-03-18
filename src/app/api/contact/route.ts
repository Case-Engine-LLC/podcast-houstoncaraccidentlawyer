import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { formConfig, attorney, siteConfig } from '@/data/siteData'

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'leads@caseengine.com'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

interface ContactPayload {
  name?: string
  email?: string
  phone?: string
  caseType?: string
  message?: string
  source?: string
  campaign?: string
  pageUrl?: string
  submittedAt?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json()
    const { name, email, phone, caseType, message, source, campaign, pageUrl, submittedAt } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 },
      )
    }

    const notifyEmails = formConfig.notifyEmails
      .split(',')
      .map(e => e.trim())
      .filter(Boolean)

    if (notifyEmails.length === 0) {
      console.error('No notification emails configured in formConfig.notifyEmails')
      return NextResponse.json(
        { success: false, error: 'Form configuration error' },
        { status: 500 },
      )
    }

    if (!process.env.RESEND_API_KEY) {
      // Dev mode — log and return success
      console.warn('[contact] No RESEND_API_KEY set. Would email:', { to: notifyEmails, name, email, message })
      return NextResponse.json({ success: true, message: 'Logged (no email service configured)' })
    }

    const firmName = attorney.firm
    const podcastName = siteConfig.podcastName

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background: #070519; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h2 style="color: #FAA31A; margin: 0; font-size: 20px;">New Lead from Podcast Site</h2>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">${podcastName}</p>
        </div>
        <div style="background: #f9f9f9; padding: 32px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></td>
            </tr>` : ''}
            ${caseType ? `<tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; vertical-align: top;">Case Type</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">${caseType}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #fff; border-radius: 6px; border: 1px solid #e5e5e5;">
            <p style="margin: 0; font-size: 12px; color: #888;">
              <strong>Source:</strong> ${source || 'podcast-website'} &nbsp;|&nbsp;
              <strong>Campaign:</strong> ${campaign || 'n/a'} &nbsp;|&nbsp;
              <strong>Page:</strong> ${pageUrl || 'n/a'}<br>
              <strong>Submitted:</strong> ${submittedAt || new Date().toISOString()}
            </p>
          </div>
        </div>
      </div>
    `

    await getResend().emails.send({
      from: `${firmName} Leads <${FROM_EMAIL}>`,
      to: notifyEmails,
      replyTo: email,
      subject: `New consultation request from ${name}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 },
    )
  }
}
