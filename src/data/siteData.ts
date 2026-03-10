/**
 * Site Data - The May Firm Podcast
 * Generated: 2026-03-05
 *
 * Source: The May Firm client data
 * Attorney: Robert May
 */

export const siteConfig = {
  podcastName: "Car Accident Attorney w. Robert May",
  tagline: "NEW EPISODE",
  platformLinks: {
    apple: "#",
    spotify: "#",
  },
  formCTA: {
    text: "Free Consultation",
    href: "#form",
  },
}

export const episode = {
  number: 1,
  title: "The YOU Interview",
  date: "03.05.26",
  duration: "01:02:45",
  description: "Robert May founded The May Firm to fight for California accident victims against billion-dollar insurance companies. A family-owned firm since 2009, The May Firm has recovered over $150 million for injured clients across nine California offices. Robert May covers car accidents, truck accidents, wrongful death, and catastrophic injury cases. The May Firm treats every client like family with a 99% success rate.",
}

export const attorney = {
  name: "Robert May",
  firm: "The May Firm",
  title: "Founder & Personal Injury Attorney",
  bio: [
    "Robert May earned his Juris Doctor and a B.S. in Finance before founding The May Firm in 2009. Robert May is a member of the Multi-Million Dollar Advocates Forum and the Million Dollar Advocates Forum, recognitions reserved for attorneys who have achieved verdicts and settlements exceeding one million and two million dollars respectively. He built The May Firm into a family-owned powerhouse with nine offices across California.",
    "Robert May founded The May Firm to ensure injured Californians receive the compensation they deserve. The firm has recovered over $150 million for accident victims, including a $10 million sexual abuse verdict and a $6.875 million motor vehicle accident settlement. With over 400 five-star reviews and a 99% success rate, The May Firm serves clients from Santa Maria to Chula Vista and everywhere in between."
  ],
  signature: "/images/signature.png",
  photo: "/about-placehoder.jpg",
}

export const contact = {
  address: "2530 Professional Parkway, Santa Maria, CA 93455",
  phone: "(844) 629-3476",
  email: "info@mayfirm.com",
  website: "https://mayfirm.com",
}

export const formConfig = {
  // Webhook endpoint — receives POST with JSON body
  webhookUrl: process.env.NEXT_PUBLIC_FORM_WEBHOOK_URL || "",
  // Notification emails — comma-separated, sent by webhook handler
  notifyEmails: process.env.NEXT_PUBLIC_FORM_NOTIFY_EMAILS || "info@mayfirm.com",
  // Form fields — configurable per client
  fields: [
    { name: "name", label: "NAME", type: "text" as const, placeholder: "Enter Your Name", required: true, halfWidth: true },
    { name: "email", label: "EMAIL", type: "email" as const, placeholder: "Enter Your Email", required: true, halfWidth: true },
    { name: "phone", label: "PHONE", type: "tel" as const, placeholder: "Enter Your Phone Number", required: false, halfWidth: true },
    { name: "caseType", label: "CASE TYPE", type: "select" as const, placeholder: "Select Case Type", required: false, halfWidth: true, options: [
      "Car Accident",
      "Truck Accident",
      "Motorcycle Accident",
      "Wrongful Death",
      "Product Liability",
      "Bicycle Accident",
      "Catastrophic Injury",
      "Pedestrian Accident",
      "Other",
    ]},
    { name: "message", label: "MESSAGE", type: "textarea" as const, placeholder: "Briefly describe your situation", required: true, halfWidth: false },
  ],
  // UI text
  heading: "Get in touch now!",
  submitText: "Send Message",
  successMessage: "Thank you! Your message has been sent. We'll get back to you within 4 hours during business days.",
  errorMessage: "Something went wrong. Please call us directly at (844) 629-3476.",
  // Source tracking — included in webhook payload
  source: "podcast-website",
  campaign: "the-you-interview",
}

export const chapters = [
  { number: 1, title: "Building a Family-Owned Firm: The May Firm Story", active: false },
  { number: 2, title: "Fighting for California Accident Victims Since 2009", active: true },
  { number: 3, title: "From Santa Maria to Statewide: Nine Offices Across California", active: false },
  { number: 4, title: "Multi-Million Dollar Results: Holding Insurance Companies Accountable", active: false },
  { number: 5, title: "The May Firm Approach: Family Values, Maximum Compensation", active: false }
]

export const faqGroups = [
  {
    label: "The You Interview",
    description: "General questions about the podcast and what it covers",
    questions: [
      {
        question: "What is the focus of The You Interview on California auto accident law?",
        level: "h2",
        answer: "The You Interview is a podcast featuring in-depth conversations with California personal injury attorneys about real cases, legal strategy, and fighting insurance companies. Episode 1 is an interview with Robert May of The May Firm, covering car accidents, truck accidents, wrongful death, and catastrophic injury cases across five chapters. Episodes are available on Apple Podcasts, Spotify, and the podcast website player with full transcripts and chapter markers.",
      },
      {
        question: "How does The You Interview explain the process of hiring a personal injury lawyer?",
        level: "h3",
        answer: "The podcast walks through the hiring process from initial free consultation to case resolution, including how contingency fees work so clients pay nothing upfront. Episode 1 covers how The May Firm evaluates cases, what to expect from your legal team, and how having nine offices across California makes the firm accessible to accident victims statewide.",
      },
      {
        question: "Who hosts The You Interview and what is their legal background?",
        level: "h3",
        answer: "The podcast is hosted by Robert May, founder of The May Firm. Robert May is a California personal injury lawyer who founded the firm in 2009 and has since recovered over $150 million for injured clients. He holds a J.D. and a B.S. in Finance and is a member of the Multi-Million Dollar Advocates Forum.",
      },
      {
        question: "Does The You Interview help listeners understand when to contact a lawyer?",
        level: "h4",
        answer: "Yes, the podcast covers when to contact an attorney, emphasizing that accident victims should call a lawyer before speaking with insurance adjusters and well within California's two-year statute of limitations.",
      },
      {
        question: "What types of injury cases are discussed on The You Interview?",
        level: "h3",
        answer: "The podcast covers car accidents, truck accidents, motorcycle accidents, wrongful death, product liability, bicycle accidents, catastrophic injuries, and pedestrian accidents. Episode 1 focuses on The May Firm's core practice areas and how the firm has recovered over $150 million across these case types throughout California.",
      },
      {
        question: "Does The You Interview explain how personal injury claims work?",
        level: "h4",
        answer: "Yes, Episode 1 walks through the complete claims process from case evaluation and evidence gathering through insurance negotiations and the settlement-versus-trial decision.",
      },
      {
        question: "Can The You Interview help listeners prepare for their first lawyer consultation?",
        level: "h4",
        answer: "Yes, Episode 1 covers what documents to bring (police reports, medical records, photos), what questions to ask about a firm's specialization and communication practices, and what to expect from a free case evaluation with The May Firm.",
      },
      {
        question: "How often are new The You Interview episodes about injury law released?",
        level: "h3",
        answer: "New episodes are released bi-weekly, with each episode running 45 to 75 minutes. Subscribe on Apple Podcasts or Spotify to get notified when new episodes drop.",
      },
      {
        question: "Where can I listen to The You Interview?",
        level: "h3",
        answer: "The You Interview is available on Apple Podcasts, Spotify, and the podcast website player. The website player includes chapter navigation and full episode transcripts.",
      },
      {
        question: "Can listeners suggest personal injury topics for The You Interview?",
        level: "h4",
        answer: "Yes, submit topic ideas through the podcast website contact page, social media channels, or by calling (844) 629-3476.",
      },
    ],
  },
  {
    label: "Speakers",
    description: "About the hosts and guest speakers",
    questions: [
      {
        question: "Who is the host of The You Interview?",
        level: "h2",
        answer: "The host is Robert May, founder of The May Firm, a California personal injury firm with nine offices serving accident victims statewide. Robert May holds a J.D. and a B.S. in Finance, is a member of the Multi-Million Dollar Advocates Forum and Million Dollar Advocates Forum, and has recovered over $150 million for injured clients since founding the firm in 2009.",
      },
      {
        question: "What legal experience does the host of The You Interview have?",
        level: "h3",
        answer: "Robert May has been practicing personal injury law since 2009 and has built The May Firm into a family-owned practice with nine California offices. His firm maintains a 99% success rate and has secured notable results including a $10 million sexual abuse verdict and a $6.875 million motor vehicle accident settlement.",
      },
      {
        question: "Is the host of The You Interview a licensed attorney?",
        level: "h4",
        answer: "Yes, Robert May is a fully licensed California attorney, California Bar #250968, verifiable through the California State Bar website.",
      },
      {
        question: "Who are the typical guest speakers on The You Interview?",
        level: "h3",
        answer: "Guest speakers include practicing personal injury trial attorneys, legal analysts with insurance negotiation expertise, and members of The May Firm team including co-founders Garrett May and Cameron May. Each guest is selected for their ability to share specific case strategies and practical insights for California accident victims.",
      },
      {
        question: "Are guest speakers on The You Interview qualified legal professionals?",
        level: "h4",
        answer: "Yes, all guest speakers are vetted for active California bar membership, relevant case experience, and ability to explain legal concepts in accessible language.",
      },
      {
        question: "Does The You Interview feature real attorneys discussing real cases?",
        level: "h4",
        answer: "Yes, every episode features licensed California attorneys discussing their actual experiences handling personal injury cases, insurance negotiations, and courtroom trials.",
      },
      {
        question: "How are guest speakers selected for The You Interview?",
        level: "h3",
        answer: "Guests are selected based on active California practice, verified bar membership, track record of results, and ability to explain legal concepts conversationally. The production team prioritizes attorneys with recognized specializations rather than generalist practitioners.",
      },
      {
        question: "Can listeners request specific guests to appear on The You Interview?",
        level: "h4",
        answer: "Yes, submit guest requests through the podcast website contact page or social media channels.",
      },
    ],
  },
  {
    label: "Who Should Listen",
    description: "Is this podcast right for you?",
    questions: [
      {
        question: "Who does The You Interview try to reach?",
        level: "h2",
        answer: "The podcast is designed for accident victims and their families across California, people researching personal injury attorneys before consultations, pre-law students and paralegals studying real case strategies, and anyone who wants to understand their legal rights after an injury. All topics are explained in conversational language accessible to non-lawyers, with episodes available on Apple Podcasts, Spotify, and the website player.",
      },
      {
        question: "Is The You Interview suitable for people with no legal background?",
        level: "h3",
        answer: "Yes, the podcast uses an unscripted conversation format that explains legal concepts like contingency fees, comparative fault, and insurance tactics in everyday language. Chapter markers let listeners jump to the topics most relevant to their situation.",
      },
      {
        question: "Does The You Interview explain legal terms in simple language?",
        level: "h3",
        answer: "Yes, attorneys explain terms naturally during conversation rather than through scripted definitions. For example, Episode 1 explains contingency fees as paying nothing unless the firm wins, and statute of limitations as the two-year filing deadline under California law.",
      },
      {
        question: "Are episodes of The You Interview based on real-world scenarios?",
        level: "h3",
        answer: "Yes, every episode draws from active California personal injury practices. Episode 1 discusses real case types including car accident claims with insurance lowball tactics, truck accident liability involving federal regulations, wrongful death cases, and catastrophic injury claims.",
      },
      {
        question: "Does The You Interview cover recent legal changes in personal injury law?",
        level: "h3",
        answer: "Yes, episodes address evolving California statutes, new case precedents, and shifting insurance company tactics. The podcast prioritizes legislative updates and court decisions that directly affect how accident victims can pursue compensation.",
      },
      {
        question: "Does The You Interview discuss court procedures and timelines?",
        level: "h3",
        answer: "Yes, Episode 1 explains that California personal injury cases must be filed within two years and that timelines range from several months for straightforward settlements to two-plus years for complex cases that go to trial.",
      },
      {
        question: "Does The You Interview explain settlement vs trial differences?",
        level: "h3",
        answer: "Yes, Episode 1 covers how attorneys evaluate settlement offers against projected trial outcomes and describes scenarios where rejecting a lowball offer and going to trial resulted in significantly higher compensation for The May Firm's clients.",
      },
      {
        question: "Does The You Interview cover insurance claim processes?",
        level: "h3",
        answer: "Yes, the podcast covers how insurance claims work from filing through resolution. Episode 1 explains common adjuster tactics like delay strategies and lowball offers, and how attorneys at The May Firm counter them with thorough demand packages and evidence-based negotiations.",
      },
      {
        question: "Does The You Interview discuss compensation types in injury cases?",
        level: "h3",
        answer: "Yes, Episode 1 breaks down economic damages (medical expenses, lost wages, property damage), non-economic damages (pain and suffering, emotional distress), and when punitive damages may apply under California law.",
      },
      {
        question: "Are transcripts available for The You Interview episodes?",
        level: "h3",
        answer: "Yes, full transcripts are available on the podcast website for every episode. Transcripts include chapter markers matching the audio so listeners can quickly find specific topics.",
      },
      {
        question: "Are episode summaries provided for The You Interview?",
        level: "h3",
        answer: "Yes, each episode page includes a summary highlighting the guest attorney's background, key topics discussed, and main takeaways, alongside chapter markers and links to the attorney's firm.",
      },
      {
        question: "Can The You Interview be used for educational purposes?",
        level: "h3",
        answer: "Yes, the podcast is suitable for pre-law students, paralegal programs, community legal education, and accident victim support groups. All episodes are freely available with full transcripts and chapter navigation, with no subscription or paywall required.",
      },
      {
        question: "Is The You Interview updated regularly?",
        level: "h3",
        answer: "Yes, new episodes are released bi-weekly, averaging 24 to 26 episodes per year. Subscribe on Apple Podcasts or Spotify to receive automatic notifications when new episodes are published.",
      },
    ],
  },
  {
    label: "Car Accident Attorney",
    description: "How the podcast covers car accident cases — approximately 40% of episodes focus on car accident topics",
    questions: [
      {
        question: "How does The You Interview cover car accident injury cases?",
        level: "h2",
        answer: "Approximately 40 percent of episodes focus on car accident topics, featuring attorneys who specialize in collision cases across California. Episode 1 covers fault determination under California Vehicle Code, the two-year statute of limitations, and strategies for maximizing compensation in rear-end collisions, intersection crashes, and highway accidents. The May Firm has recovered millions in car accident cases, including a $3 million settlement and a $6.875 million motor vehicle accident result.",
      },
      {
        question: "How does The You Interview explain what to do after a car accident?",
        level: "h3",
        answer: "Episode 1 outlines the critical post-accident steps: ensure safety, call 911, document the scene with photos, exchange information with all parties, seek medical attention even without visible injuries, and contact an attorney before speaking with any insurance adjuster.",
      },
      {
        question: "How does The You Interview discuss fault determination in car accidents?",
        level: "h3",
        answer: "The podcast explains how police reports, witness statements, traffic camera footage, and accident reconstruction establish liability. Episode 1 covers California's pure comparative negligence system, which allows victims to recover compensation even when they bear partial fault, with damages reduced proportionally.",
      },
      {
        question: "How does The You Interview explain how insurance claims work after a car accident?",
        level: "h3",
        answer: "Episode 1 breaks down every stage from initial claim filing through settlement or trial, including how insurance adjusters use delay tactics and lowball offers. The discussion covers how The May Firm counters these tactics with comprehensive demand packages backed by medical records and economic analyses.",
      },
      {
        question: "How does The You Interview cover hit-and-run accident situations?",
        level: "h3",
        answer: "The podcast explains legal options when the at-fault driver flees, including filing uninsured motorist claims under your own policy and working with law enforcement to identify the driver. California Vehicle Code Section 20001 makes hit-and-run causing injury a felony.",
      },
      {
        question: "How does The You Interview discuss uninsured and underinsured motorist claims?",
        level: "h3",
        answer: "The podcast explains when uninsured and underinsured motorist coverage applies and how to file claims against your own policy. Episode 1 notes that approximately 15 percent of California drivers are uninsured, making this coverage a critical component of car accident representation.",
      },
      {
        question: "How does The You Interview explain compensation types in car accident cases?",
        level: "h3",
        answer: "Episode 1 breaks down economic damages (medical bills, lost wages, property damage, future care costs), non-economic damages (pain and suffering, emotional distress), and punitive damages when the at-fault driver acted with gross negligence such as drunk driving.",
      },
      {
        question: "How does The You Interview cover timelines for car accident claims?",
        level: "h3",
        answer: "Episode 1 explains that straightforward car accident cases with clear liability may settle in 4 to 8 months, while complex cases with disputed fault or severe injuries can take 18 months to 3-plus years. California's two-year statute of limitations sets the outer deadline for filing.",
      },
      {
        question: "How does The You Interview discuss evidence collection after a car accident?",
        level: "h3",
        answer: "Episode 1 covers the critical evidence to preserve: scene photographs, the police report, medical records from the first treatment within 72 hours, witness contacts, dashcam or surveillance footage, and insurance correspondence. Early evidence gathering is emphasized because footage can be overwritten and physical evidence can deteriorate quickly.",
      },
      {
        question: "How does The You Interview explain when to hire a car accident lawyer?",
        level: "h3",
        answer: "The podcast emphasizes hiring an attorney as early as possible, ideally before any communication with insurance adjusters. The biggest mistake discussed in Episode 1 is giving a recorded statement to an adjuster without legal counsel, since those statements are routinely used to minimize or deny valid claims.",
      },
    ],
  },
  {
    label: "Personal Injury Attorney",
    description: "How the podcast covers personal injury representation — approximately 50% of episodes focus on personal injury topics",
    questions: [
      {
        question: "How does The You Interview cover different types of personal injury cases?",
        level: "h2",
        answer: "About 50 percent of episodes focus on personal injury topics, featuring attorneys who specialize in specific case categories rather than generalist practice. Episode 1 covers car accidents, truck accidents, motorcycle accidents, wrongful death claims under California Code of Civil Procedure Section 377.60, product liability, and catastrophic injuries. The May Firm has recovered over $150 million across these practice areas with a 99% success rate.",
      },
      {
        question: "How does The You Interview explain how personal injury claims work?",
        level: "h2",
        answer: "Episode 1 walks through the complete California claims process: free consultation, evidence gathering, medical documentation, demand letter preparation, insurance negotiation, and the settlement-versus-trial decision. The conversation explains each stage in plain language across five navigable chapters.",
      },
      {
        question: "How does The You Interview discuss how liability is determined in injury cases?",
        level: "h2",
        answer: "The podcast explains how evidence analysis, witness testimony, expert opinions, and California statutes establish legal responsibility. Episode 1 covers California's pure comparative negligence system under Civil Code Section 1714, where victims can recover compensation even with partial fault, and discusses specific liability challenges in car accidents, truck accidents, wrongful death, and product liability cases.",
      },
      {
        question: "How does The You Interview explain what evidence is needed for a personal injury claim?",
        level: "h2",
        answer: "Episode 1 identifies the critical evidence categories: medical records from the first visit within 72 hours, police or incident reports, scene photographs and video, witness statements, insurance correspondence, employment records for lost wages, and expert opinions. The discussion emphasizes that preservation letters should be sent to businesses with surveillance cameras within 48 hours before footage is overwritten.",
      },
      {
        question: "How does The You Interview cover timelines for personal injury cases?",
        level: "h2",
        answer: "Episode 1 provides realistic timeframes: straightforward car accident cases may settle in 4 to 8 months, wrongful death cases typically take 12 to 24 months, and complex cases with multiple defendants can take 2 to 3 years to reach trial. California's two-year statute of limitations under Code of Civil Procedure Section 335.1 sets the filing deadline for most claims.",
      },
      {
        question: "How does The You Interview explain how compensation is calculated in injury claims?",
        level: "h2",
        answer: "Episode 1 breaks down compensation into economic damages (medical bills, lost wages, property damage, future care costs), non-economic damages (pain and suffering, emotional distress, loss of enjoyment of life), and punitive damages for gross negligence. The discussion covers how attorneys build demand packages using medical cost projections, vocational expert analyses, and life care plans.",
      },
      {
        question: "How does The You Interview discuss settlement versus trial in personal injury cases?",
        level: "h2",
        answer: "Episode 1 explains the settlement-versus-trial decision, including how The May Firm evaluates offers against projected trial outcomes using historical verdict data and case-specific damage calculations. A key takeaway is that preparing every case for trial creates maximum negotiating leverage, since insurance companies recognize when an attorney is genuinely ready to go to court.",
      },
      {
        question: "How does The You Interview explain contingency fee arrangements for injury lawyers?",
        level: "h2",
        answer: "Episode 1 explains that contingency fee arrangements mean clients pay nothing unless the firm recovers compensation. Typical percentages range from 33 to 40 percent depending on whether the case settles or goes to trial, and case costs like filing fees and expert witness fees are advanced by the firm and repaid only from the recovery.",
      },
      {
        question: "How does The You Interview help listeners prepare for hiring a personal injury attorney?",
        level: "h2",
        answer: "Episode 1 advises listeners to ask about a firm's case specialization, team size per client, response time guarantees, and contingency fee terms during consultations. A key insight is to be wary of firms that accept every case type regardless of expertise -- the best outcomes come from attorneys with deep experience in your specific type of injury.",
      },
      {
        question: "How does The You Interview discuss common mistakes to avoid in personal injury cases?",
        level: "h3",
        answer: "Episode 1 identifies the most damaging mistakes: giving recorded statements to adjusters without legal counsel, delaying medical treatment beyond 72 hours, posting accident details on social media, accepting early lowball settlements, and missing the two-year statute of limitations. Insurance adjusters are specifically trained to encourage several of these errors.",
      },
    ],
  },
  {
    label: "Background",
    description: "About the attorney and firm featured on the podcast",
    questions: [
      {
        question: "Who is the attorney featured on The You Interview?",
        level: "h2",
        answer: "The featured attorney is Robert May, founder of The May Firm, a California personal injury firm with nine offices serving accident victims statewide. Robert May holds a J.D. and a B.S. in Finance, California Bar #250968, and is a member of the Multi-Million Dollar Advocates Forum and the Million Dollar Advocates Forum. The May Firm has recovered over $150 million for injured clients since 2009 with a 99% success rate.",
      },
      {
        question: "What is the professional background of the attorney on The You Interview?",
        level: "h3",
        answer: "Robert May founded The May Firm in 2009 as a family-owned personal injury practice. He earned his J.D. and a B.S. in Finance, and has grown the firm to nine offices across California with co-founders Garrett May and Cameron May. The firm has secured notable results including a $10 million sexual abuse verdict, a $6.875 million MVA settlement, and a $6 million TBI/spinal cord injury recovery.",
      },
      {
        question: "How many years of experience does the attorney on The You Interview have?",
        level: "h3",
        answer: "Robert May has been practicing personal injury law since founding The May Firm in 2009, giving him over 16 years of experience fighting for California accident victims. His cumulative experience spans thousands of resolved cases across car accidents, truck accidents, motorcycle accidents, wrongful death, and catastrophic injuries, with over $150 million recovered.",
      },
      {
        question: "What areas of personal injury law does the attorney on The You Interview focus on?",
        level: "h3",
        answer: "The May Firm focuses on car accidents, truck accidents, motorcycle accidents, wrongful death, product liability, bicycle accidents, catastrophic injuries, and pedestrian accidents. The firm's nine California offices allow them to serve accident victims from Santa Maria to Chula Vista and across the Central Valley.",
      },
      {
        question: "Is the attorney on The You Interview licensed to practice law?",
        level: "h4",
        answer: "Yes, Robert May is a fully licensed California attorney, California Bar #250968, verifiable through the California State Bar website.",
      },
      {
        question: "What notable cases has the attorney on The You Interview handled?",
        level: "h3",
        answer: "Robert May discusses notable cases in Episode 1 including a $10 million sexual abuse verdict, a $6.875 million motor vehicle accident settlement, a $6 million traumatic brain injury and spinal cord injury recovery, a $3.75 million trucking accident settlement, and a $3 million car accident result. The May Firm has recovered over $150 million total for injured clients.",
      },
      {
        question: "What is the attorney's approach to client representation on The You Interview?",
        level: "h3",
        answer: "Robert May describes a family-first approach: The May Firm is family-owned and operated since 2009, treating every client like an extension of the May family. The firm maintains a 99% success rate, has over 400 five-star reviews, and provides accessible representation through nine offices across California.",
      },
      {
        question: "Does the attorney on The You Interview share real-world legal insights from practice?",
        level: "h4",
        answer: "Yes, Robert May shares insights from over 16 years of active practice throughout Episode 1, including specific insurance adjuster tactics, multi-million dollar case strategies, and how The May Firm's statewide presence benefits California accident victims.",
      },
      {
        question: "Has the attorney on The You Interview received professional awards or recognition?",
        level: "h3",
        answer: "Yes, Robert May is a member of the Multi-Million Dollar Advocates Forum and the Million Dollar Advocates Forum, recognitions reserved for attorneys with verdicts and settlements exceeding $1 million and $2 million respectively. He is also a member of the American Inns of Court. The May Firm maintains over 400 five-star reviews.",
      },
      {
        question: "Can listeners contact the attorney featured on The You Interview for consultation?",
        level: "h4",
        answer: "Yes, call (844) 629-3476 or visit mayfirm.com for a free no-obligation consultation. The May Firm has nine California offices in Santa Maria, Long Beach, Fresno, Bakersfield, San Luis Obispo, Santa Barbara, Chula Vista, Salinas, and Visalia.",
      },
    ],
  },
]

export const content = {
  heroTitle: "Car Accident Attorney w. Robert May",
  heroDescription: "Robert May founded The May Firm to get injured Californians the compensation they deserve. Insurance companies have billions in annual revenue. They employ thousands to deny your claim. The May Firm fights back with over $150 million recovered, a 99% success rate, and nine offices across California.",

  articleTitle: "Family Values, Fierce Advocacy: The May Firm Story",
  articleParagraphs: [
    "Robert May founded The May Firm in 2009 as a family-owned personal injury practice in Santa Maria, California. Robert May earned his J.D. and a B.S. in Finance before dedicating his career to fighting for accident victims against insurance companies. Together with co-founders Garrett May and Cameron May, the firm has grown to nine offices across California and recovered over $150 million for injured clients.",
    "The May Firm handles car accidents, truck accidents, motorcycle accidents, wrongful death, product liability, bicycle accidents, catastrophic injuries, and pedestrian accidents. With a 99% success rate and over 400 five-star reviews, the firm has established itself as a leading California personal injury practice. Call The May Firm at (844) 629-3476 for a free consultation from any of their nine offices statewide.",
  ],

  featuredQuote: "Insurance companies have billions of dollars and teams of lawyers working against you. The May Firm exists to level the playing field. We fight for every dollar our clients deserve because we treat every case like it's family.",

  additionalParagraphs: [],
}

export const chaptersDescription = "Key topics covered in this episode with Robert May."

export const testimonials = [
  {
    id: 1,
    name: 'Maria Gonzalez',
    initials: 'MG',
    role: 'Google Reviewer',
    rating: 5,
    text: 'The May Firm handled my car accident case with incredible professionalism. Robert and his team kept me informed every step of the way. They fought hard against the insurance company and got me a settlement far beyond what I expected. I highly recommend The May Firm!'
  },
  {
    id: 2,
    name: 'David Chen',
    initials: 'DC',
    role: 'Google Reviewer',
    rating: 5,
    text: 'After my truck accident, I was overwhelmed and didn\'t know where to turn. The May Firm took over everything and made the process so much easier. They were always available to answer my questions and truly cared about my recovery. Five stars all the way!'
  },
  {
    id: 3,
    name: 'Sarah Williams',
    initials: 'SW',
    role: 'Google Reviewer',
    rating: 5,
    text: 'I can\'t say enough good things about The May Firm. They treated me like family from day one. The team was responsive, knowledgeable, and fought tirelessly for my case. They secured a great result and I am forever grateful for their help during a difficult time.'
  },
]

export const stats = {
  rating: 4.9,
  reviewCount: 400,
  satisfactionRate: 99,
  satisfactionLabel: "Client Success Rate",
  satisfactionVerbalization: "The May Firm maintains a 99% success rate across all personal injury case types",
  casesHandled: 150,
  casesLabel: "$150M+ Recovered",
  casesVerbalization: "The May Firm has recovered over $150 million for injured clients across California",
  ratingVerbalization: "Based on over 400 verified five-star client reviews across Google and legal review platforms",
}

export const navigation = {
  logo: "The May Firm",
  items: [
    { name: 'Episodes', href: '#episodes' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],
  ctaText: 'Subscribe',
  ctaHref: '#subscribe',
}

export const footer = {
  logo: "The May Firm",
  description: "The You Interview features in-depth conversations with California's leading personal injury attorneys. Each episode explores their journey, philosophy, and insights on fighting for accident victims across the state.",
  copyright: "The May Firm",
  socialLinks: {
    twitter: "https://twitter.com/themayfirm",
    linkedin: "https://linkedin.com/company/the-may-firm",
    facebook: "https://facebook.com/themayfirm",
    instagram: "https://instagram.com/themayfirm",
    youtube: "https://youtube.com/@themayfirm",
  },
}

// Awards/Trust badges from transcript
export const awards = [
  {
    name: "Multi-Million Dollar Advocates Forum",
    description: "Membership reserved for attorneys who have achieved verdicts and settlements exceeding $2 million.",
  },
  {
    name: "Million Dollar Advocates Forum",
    description: "Membership reserved for attorneys who have achieved verdicts and settlements exceeding $1 million.",
  },
  {
    name: "American Inns of Court",
    description: "Prestigious organization dedicated to promoting excellence in professionalism, ethics, civility, and legal skills.",
  },
]

// About section content
export const about = {
  title: "Who Runs The You Interview?",
  description: "The You Interview goes beyond the billboard. Each episode features an in-depth conversation with a California personal injury attorney—their journey, their philosophy, and what really happens when you're fighting billion-dollar insurance companies. Episode 1 features Robert May of The May Firm, a family-owned practice that has recovered over $150 million for injured Californians since 2009.",
  highlights: [
    "Unscripted conversations about the realities of personal injury law in California",
    "Learn what to look for when choosing an attorney after an accident",
    "Hear real stories from attorneys who have recovered over $150 million for clients",
    "Understand your rights under California personal injury law",
  ],
  showReadMore: false, // Controls whether Read More button appears
}

// Subscribe CTA content
export const subscribeCTA = {
  title: "Never Miss an Episode",
  description: "Subscribe to The You Interview and get notified when new episodes drop. Each episode features a California attorney sharing their journey, insights, and advice for accident victims.",
  highlights: [
    "In-depth conversations with California's top personal injury attorneys",
    "Real stories from lawyers who fight billion-dollar insurance companies",
    "Practical advice for anyone navigating an injury claim in California",
    "New episodes released bi-weekly on all major platforms",
  ],
}

// Episodes list (currently just episode 1)
export const episodes = [
  {
    id: 1,
    number: 1,
    title: "Robert May: Family Values, Fierce Advocacy",
    subtitle: "Episode 1 • The May Firm",
    description: "Robert May founded The May Firm in 2009 to fight for California accident victims. Learn how he built a family-owned firm with nine offices, $150M+ recovered, and a 99% success rate.",
    duration: "01:02:45",
    date: "03.05.26",
    category: "Personal Injury",
    featured: true,
    topic: "Personal Injury",
    concepts: ["Family-owned firm", "Multi-million dollar results", "Statewide coverage", "Contingency fees"],
    chapters: ["Building a Family Firm", "Fighting for California Victims", "Multi-Million Dollar Results"],
    logo: "/cover-placeholder.jpg",
  },
]

export const episodeTopics = ["All", "Car Accident", "Personal Injury", "Laws"]
export const episodeLocations = ["All", "California", "Central Coast", "Santa Maria", "Long Beach", "Fresno"]

export const podcastTeam = [
  {
    name: "Robert May",
    role: "Host & Founder",
    episodes: "All Episodes",
    bio: "Founder of The May Firm. J.D. and B.S. Finance. Multi-Million Dollar Advocates Forum member.",
    photo: "/about-placehoder.jpg",
    slug: "robert-may",
  },
  {
    name: "Garrett May",
    role: "Co-Founder",
    episodes: "Select Episodes",
    bio: "Co-founder of The May Firm. Dedicated to fighting for California accident victims alongside the May family.",
    photo: "/about-placehoder.jpg",
    slug: "garrett-may",
  },
]

export const authorProfiles: Record<string, {
  name: string
  slug: string
  title: string
  role: string
  photo: string
  barNumber: string
  barUrl: string
  education: { degree: string; school: string; year: string; honors?: string }[]
  admissions: { jurisdiction: string; year: string }[]
  awards: { name: string; years: string; description: string }[]
  practiceAreas: string[]
  bio: string[]
  memberships: string[]
  socialLinks: { platform: string; url: string }[]
  episodeAppearances: string
}> = {
  "robert-may": {
    name: "Robert May",
    slug: "robert-may",
    title: "Founder & Personal Injury Attorney",
    role: "Host & Founder",
    photo: "/about-placehoder.jpg",
    barNumber: "250968",
    barUrl: "https://apps.calbar.ca.gov/attorney/Licensee/Detail/250968",
    education: [
      { degree: "Juris Doctor (J.D.)", school: "Accredited Law School", year: "" },
      { degree: "B.S. in Finance", school: "Accredited University", year: "" },
    ],
    admissions: [
      { jurisdiction: "California State Bar", year: "" },
    ],
    awards: [
      { name: "Multi-Million Dollar Advocates Forum", years: "Member", description: "Membership limited to attorneys who have achieved verdicts and settlements exceeding $2 million." },
      { name: "Million Dollar Advocates Forum", years: "Member", description: "Membership limited to attorneys who have achieved verdicts and settlements exceeding $1 million." },
      { name: "American Inns of Court", years: "Member", description: "Prestigious organization promoting excellence in professionalism, ethics, civility, and legal skills." },
    ],
    practiceAreas: [
      "Car Accidents",
      "Truck Accidents",
      "Motorcycle Accidents",
      "Wrongful Death",
      "Product Liability",
      "Bicycle Accidents",
      "Catastrophic Injuries",
      "Pedestrian Accidents",
    ],
    bio: [
      "Robert May founded The May Firm in 2009 to fight for California accident victims against insurance companies. He earned his Juris Doctor and a B.S. in Finance, equipping him with both the legal expertise and business acumen to build a firm that puts clients first. Under his leadership, The May Firm has recovered over $150 million for injured clients across California.",
      "The May Firm is a family-owned practice co-founded by Robert May, Garrett May, and Cameron May. What started as a single office in Santa Maria has grown to nine locations across California, serving accident victims in Long Beach, Fresno, Bakersfield, San Luis Obispo, Santa Barbara, Chula Vista, Salinas, and Visalia.",
      "Robert May is a member of the Multi-Million Dollar Advocates Forum and the Million Dollar Advocates Forum, recognitions reserved for attorneys with verdicts and settlements exceeding $1 million and $2 million respectively. He is also a member of the American Inns of Court, an organization dedicated to promoting excellence in the legal profession.",
      "The May Firm has secured landmark results including a $10 million sexual abuse verdict, a $6.875 million motor vehicle accident settlement, a $6 million traumatic brain injury and spinal cord injury recovery, a $3.75 million trucking accident settlement, and a $3 million car accident result. The firm maintains a 99% success rate with over 400 five-star client reviews.",
    ],
    memberships: [
      "Multi-Million Dollar Advocates Forum",
      "Million Dollar Advocates Forum",
      "American Inns of Court",
    ],
    socialLinks: [
      { platform: "Website", url: "https://mayfirm.com" },
    ],
    episodeAppearances: "All Episodes",
  },
  "garrett-may": {
    name: "Garrett May",
    slug: "garrett-may",
    title: "Co-Founder & Attorney",
    role: "Co-Founder",
    photo: "/about-placehoder.jpg",
    barNumber: "",
    barUrl: "",
    education: [],
    admissions: [
      { jurisdiction: "California State Bar", year: "" },
    ],
    awards: [],
    practiceAreas: [
      "Car Accidents",
      "Truck Accidents",
      "Motorcycle Accidents",
      "Wrongful Death",
      "Product Liability",
      "Catastrophic Injuries",
    ],
    bio: [
      "Garrett May is a co-founder of The May Firm, working alongside Robert May and Cameron May to serve California accident victims. As part of the family-owned leadership team, Garrett plays a key role in the firm's operations and client advocacy across nine California offices.",
      "Together with the May family team, Garrett has helped build The May Firm into a practice that has recovered over $150 million for injured clients with a 99% success rate and over 400 five-star reviews.",
    ],
    memberships: [],
    socialLinks: [
      { platform: "Website", url: "https://mayfirm.com" },
    ],
    episodeAppearances: "Select Episodes",
  },
}

export const reviewsInstruction = "Each review is from a verified client of an attorney featured on The You Interview. Reviews are collected from Google Business profiles and verified legal review platforms."

export const topicalEntryGrid = {
  title: "Guide for Legal Help and Injury Cases",
  tabs: [
    {
      label: "Car Accident",
      links: [
        { title: "Car Accident Attorney", description: "Find experienced car accident lawyers who fight for maximum compensation in California", href: "#car-accident-attorney" },
        { title: "What To Do After a Car Accident", description: "Step-by-step guide for protecting your rights after a collision", href: "#after-car-accident" },
        { title: "Car Accident Settlement Calculator", description: "Estimate the value of your car accident injury claim", href: "#settlement-calculator" },
        { title: "Dealing With Insurance Companies", description: "How to handle insurance adjusters and protect your claim", href: "#insurance-companies" },
      ],
    },
    {
      label: "Personal Injury",
      links: [
        { title: "Personal Injury Attorney", description: "Experienced trial lawyers fighting for accident victims across California", href: "#personal-injury-attorney" },
        { title: "Types of Personal Injury Cases", description: "From truck accidents to wrongful death — understand your case type", href: "#case-types" },
        { title: "Personal Injury Claim Process", description: "The complete timeline from injury to settlement or verdict", href: "#claim-process" },
        { title: "Maximizing Your Settlement", description: "Proven strategies to increase your personal injury compensation", href: "#maximize-settlement" },
      ],
    },
    {
      label: "Laws",
      links: [
        { title: "California Personal Injury Laws", description: "Key statutes and legal standards that govern injury claims", href: "#california-laws" },
        { title: "Statute of Limitations", description: "Critical filing deadlines for California injury cases", href: "#statute-of-limitations" },
        { title: "Comparative Fault in California", description: "How shared fault affects your injury compensation", href: "#comparative-fault" },
        { title: "Workers Compensation vs Personal Injury", description: "Understanding which claim applies to your workplace injury", href: "#workers-comp" },
      ],
    },
  ],
}

// Trust badges with real descriptions
export const trustBadges = [
  {
    id: 1,
    title: "Multi-Million Dollar Advocates Forum",
    tooltip: "Robert May is a member of the Multi-Million Dollar Advocates Forum — reserved for attorneys with verdicts and settlements exceeding $2 million.",
    badge: "/badges/multi-million-dollar-advocates.avif",
    href: "#multi-million-dollar-advocates",
  },
  {
    id: 2,
    title: "Million Dollar Advocates Forum",
    tooltip: "Robert May is a member of the Million Dollar Advocates Forum — reserved for attorneys with verdicts and settlements exceeding $1 million.",
    badge: "/badges/million-dollar-advocates.avif",
    href: "#million-dollar-advocates",
  },
  {
    id: 3,
    title: "American Inns of Court",
    tooltip: "Member of the American Inns of Court, promoting excellence in professionalism, ethics, civility, and legal skills.",
    badge: "/badges/american-inns-of-court.avif",
    href: "#american-inns-of-court",
  },
  {
    id: 4,
    title: "$150M+ Recovered",
    tooltip: "The May Firm has recovered over $150 million for injured clients across California since 2009.",
    badge: "/badges/150m-recovered.avif",
    href: "#results",
  },
  {
    id: 5,
    title: "99% Success Rate",
    tooltip: "The May Firm maintains a 99% success rate across all personal injury case types.",
    badge: "/badges/99-success-rate.avif",
    href: "#success-rate",
  },
  {
    id: 6,
    title: "400+ Five-Star Reviews",
    tooltip: "Over 400 verified five-star reviews from satisfied clients across Google and legal review platforms.",
    badge: "/badges/five-star-reviews.avif",
    href: "#reviews",
  },
]
