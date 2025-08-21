import React from 'react'

type FormPreviewProps = {
    children:React.ReactNode
}

function FormPreview({children} : Readonly<FormPreviewProps>) {
  return (
      <form>
        {
            children
        }
     </form>
  )
}

export default FormPreview
