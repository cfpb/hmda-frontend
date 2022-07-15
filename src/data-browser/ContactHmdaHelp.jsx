export const ContactHmdaHelp = ({ subject }) => {
  let url = 'mailto:hmdahelp@cfpb.gov'
  if (subject) url += `?subject=${subject}`

  return (
    <>
      Additional questions or suggestions can be sent to{' '}
      <a href={url}>hmdahelp@cfpb.gov</a>.
    </>
  )
}
