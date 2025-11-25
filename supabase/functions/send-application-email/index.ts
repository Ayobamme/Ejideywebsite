import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ApplicationData {
  surname: string;
  first_name: string;
  middle_name?: string;
  guardian_email: string;
  guardian_name: string;
  guardian_mobile: string;
  class_seeking_admission: string;
  date_of_birth: string;
  gender: string;
  nationality?: string;
  state_of_origin?: string;
  lga?: string;
  exam_centre?: string;
  guardian_occupation?: string;
  blood_group?: string;
  genotype?: string;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { applicationData }: { applicationData: ApplicationData } = await req.json();

    const studentFullName = `${applicationData.surname} ${applicationData.first_name} ${applicationData.middle_name || ''}`.trim();

    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Ejidey Schools <onboarding@resend.dev>',
        to: ['jekztechnologies@gmail.com'],
        subject: `New Application: ${studentFullName} - ${applicationData.class_seeking_admission}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">New Student Application</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">Ejidey Schools Admissions</p>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff;">
              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; margin-bottom: 25px;">
                <h2 style="color: #059669; margin: 0 0 15px 0; font-size: 22px;">Student Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #d1fae5;">
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">Full Name:</td>
                    <td style="padding: 10px 0;">${studentFullName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #d1fae5;">
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">Date of Birth:</td>
                    <td style="padding: 10px 0;">${new Date(applicationData.date_of_birth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #d1fae5;">
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">Gender:</td>
                    <td style="padding: 10px 0;">${applicationData.gender}</td>
                  </tr>
                  ${applicationData.nationality ? `<tr style="border-bottom: 1px solid #d1fae5;">
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">Nationality:</td>
                    <td style="padding: 10px 0;">${applicationData.nationality}</td>
                  </tr>` : ''}
                  ${applicationData.state_of_origin ? `<tr style="border-bottom: 1px solid #d1fae5;">
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">State of Origin:</td>
                    <td style="padding: 10px 0;">${applicationData.state_of_origin}</td>
                  </tr>` : ''}
                  ${applicationData.lga ? `<tr style="border-bottom: 1px solid #d1fae5;">
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">LGA:</td>
                    <td style="padding: 10px 0;">${applicationData.lga}</td>
                  </tr>` : ''}
                  <tr style="border-bottom: 1px solid #d1fae5;">
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">Class Applying For:</td>
                    <td style="padding: 10px 0; font-size: 16px;"><strong>${applicationData.class_seeking_admission}</strong></td>
                  </tr>
                  ${applicationData.exam_centre ? `<tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #047857;">Exam Centre:</td>
                    <td style="padding: 10px 0;">${applicationData.exam_centre}</td>
                  </tr>` : ''}
                </table>
              </div>
              
              ${(applicationData.blood_group || applicationData.genotype) ? `<div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 25px;">
                <h2 style="color: #d97706; margin: 0 0 15px 0; font-size: 20px;">Medical Information</h2>
                <table style="width: 100%;">
                  ${applicationData.blood_group ? `<tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #92400e;">Blood Group:</td>
                    <td style="padding: 8px 0;">${applicationData.blood_group}</td>
                  </tr>` : ''}
                  ${applicationData.genotype ? `<tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #92400e;">Genotype:</td>
                    <td style="padding: 8px 0;">${applicationData.genotype}</td>
                  </tr>` : ''}
                </table>
              </div>` : ''}
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 25px;">
                <h2 style="color: #1e40af; margin: 0 0 15px 0; font-size: 20px;">Guardian Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #bfdbfe;">
                    <td style="padding: 10px 0; font-weight: bold; color: #1e40af;">Name:</td>
                    <td style="padding: 10px 0;">${applicationData.guardian_name}</td>
                  </tr>
                  ${applicationData.guardian_occupation ? `<tr style="border-bottom: 1px solid #bfdbfe;">
                    <td style="padding: 10px 0; font-weight: bold; color: #1e40af;">Occupation:</td>
                    <td style="padding: 10px 0;">${applicationData.guardian_occupation}</td>
                  </tr>` : ''}
                  <tr style="border-bottom: 1px solid #bfdbfe;">
                    <td style="padding: 10px 0; font-weight: bold; color: #1e40af;">Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${applicationData.guardian_email}" style="color: #2563eb;">${applicationData.guardian_email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #1e40af;">Phone:</td>
                    <td style="padding: 10px 0;"><a href="tel:${applicationData.guardian_mobile}" style="color: #2563eb;">${applicationData.guardian_mobile}</a></td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <p style="margin: 0; color: #4b5563;"><strong>Submission Date:</strong> ${new Date(applicationData.created_at).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </div>
              
              <div style="background-color: #059669; padding: 20px; border-radius: 8px; text-align: center;">
                <p style="color: white; margin: 0 0 15px 0; font-size: 16px;">Please log in to the admin portal to review this application and view all submitted documents.</p>
                <a href="#" style="display: inline-block; background-color: white; color: #059669; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Application</a>
              </div>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">This is an automated notification from Ejidey Schools Admissions System</p>
            </div>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errorData = await adminEmailResponse.json();
      console.error('Admin email error:', errorData);
      throw new Error('Failed to send admin email');
    }

    const applicantEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Ejidey Schools <onboarding@resend.dev>',
        to: [applicationData.guardian_email],
        subject: 'Application Confirmation - Ejidey Schools',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 32px; font-weight: bold;">Ejidey Schools</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">Excellence in Education</p>
            </div>
            
            <div style="padding: 40px 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background-color: #d1fae5; color: #047857; padding: 8px 20px; border-radius: 20px; font-weight: bold;">
                  ✓ Application Received
                </div>
              </div>
              
              <h2 style="color: #059669; margin: 0 0 20px 0; font-size: 24px;">Dear ${applicationData.guardian_name},</h2>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                Thank you for submitting an application for <strong>${studentFullName}</strong> to join <strong>${applicationData.class_seeking_admission}</strong> at Ejidey Schools.
              </p>
              
              <div style="background-color: #f0fdf4; padding: 25px; border-radius: 10px; border-left: 5px solid #059669; margin: 30px 0;">
                <h3 style="color: #059669; margin: 0 0 20px 0; font-size: 20px;">📋 What Happens Next?</h3>
                <ol style="margin: 0; padding-left: 20px; color: #374151; line-height: 2;">
                  <li style="margin-bottom: 12px;">Our admissions team will carefully <strong>review your application</strong> and submitted documents</li>
                  <li style="margin-bottom: 12px;">You will be contacted within <strong>3-5 business days</strong> via email or phone</li>
                  <li style="margin-bottom: 12px;">An <strong>aptitude test</strong> will be scheduled if the application meets our requirements</li>
                  <li>We will guide you through the complete <strong>enrollment process</strong></li>
                </ol>
              </div>
              
              <div style="background-color: #eff6ff; padding: 25px; border-radius: 10px; margin: 30px 0;">
                <h3 style="color: #2563eb; margin: 0 0 15px 0; font-size: 18px;">📝 Application Summary</h3>
                <table style="width: 100%; font-size: 15px;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Student Name:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">${studentFullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Class Applying For:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">${applicationData.class_seeking_admission}</td>
                  </tr>
                  ${applicationData.exam_centre ? `<tr>
                    <td style="padding: 8px 0; color: #6b7280;">Exam Centre:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">${applicationData.exam_centre}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Submission Date:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">${new Date(applicationData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>⚠️ Important:</strong> Please ensure your phone and email are accessible so we can reach you promptly with updates about your application.
                </p>
              </div>
              
              <div style="border-top: 2px solid #e5e7eb; padding-top: 25px; margin-top: 35px;">
                <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">📞 Contact Us</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 5px 0; color: #6b7280;">📧 Email:</td>
                    <td style="padding: 5px 0;"><a href="mailto:info@ejideychools.ng" style="color: #059669; text-decoration: none;">info@ejideychools.ng</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #6b7280;">📱 Phone:</td>
                    <td style="padding: 5px 0;"><a href="tel:+2348028547932" style="color: #059669; text-decoration: none;">+234 802 854 7932</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #6b7280;">💬 WhatsApp:</td>
                    <td style="padding: 5px 0;"><a href="https://wa.me/2348028547932" style="color: #059669; text-decoration: none;">+234 802 854 7932</a></td>
                  </tr>
                </table>
              </div>
              
              <p style="margin-top: 35px; color: #6b7280; font-size: 15px; line-height: 1.6;">
                Thank you for choosing Ejidey Schools. We look forward to welcoming <strong>${studentFullName}</strong> to our learning community where we nurture excellence and character.
              </p>
              
              <p style="margin-top: 25px; font-weight: bold; color: #059669; font-size: 16px;">Warm regards,<br/>Ejidey Schools Admissions Team</p>
            </div>
            
            <div style="text-align: center; padding: 25px; background-color: #f9fafb; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="margin: 0; color: #9ca3af; font-size: 13px;">This is an automated confirmation email. Please do not reply to this message.</p>
              <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Ejidey Schools. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!applicantEmailResponse.ok) {
      const errorData = await applicantEmailResponse.json();
      console.error('Applicant email error:', errorData);
      throw new Error('Failed to send applicant email');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});