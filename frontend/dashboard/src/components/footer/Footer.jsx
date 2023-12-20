import './Footer.scss'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className='footer'>
      <span>&copy; {year} Advenshop Admin Dashboard</span>
    </div>
  )
}

