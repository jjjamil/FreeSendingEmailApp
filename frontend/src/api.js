import axios from 'axios'

export async function startSendJob({ senderEmail, senderPassword, subject, htmlBody, recipients, csvFile }) {
  const formData = new FormData()
  formData.append('sender_email', senderEmail)
  formData.append('sender_password', senderPassword)
  formData.append('subject', subject)
  formData.append('html_body', htmlBody)

  if (csvFile) {
    formData.append('csv_file', csvFile)
  } else {
    formData.append('recipients_json', JSON.stringify(recipients))
  }

  const res = await axios.post('/api/send', formData)
  return res.data
}

export async function getJobStatus(jobId) {
  const res = await axios.get(`/api/status/${jobId}`)
  return res.data
}
