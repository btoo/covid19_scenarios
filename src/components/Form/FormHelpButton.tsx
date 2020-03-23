import React, { useState, useRef } from 'react'

import { Button, Card, CardBody, CardHeader, UncontrolledPopover } from 'reactstrap'

import { FaQuestion } from 'react-icons/fa'

import './FormHelpButton.scss'
import { useOuterClickNotifier } from '../../helpers/hooks'

function safeId(id: string) {
  return id.replace('.', '-')
}

export interface FormHelpButtonProps {
  identifier: string
  label: string | React.ReactNode
  help?: string | React.ReactNode
}

export default function FormHelpButton({ identifier, label, help }: FormHelpButtonProps) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>();

  useOuterClickNotifier(e => setPopoverOpen(false), buttonRef);

  return (
    <>
      <Button
        ref={buttonRef}
        id={safeId(identifier)}
        className="help-button"
        type="button"
        aria-label="help"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          setPopoverOpen(!popoverOpen)
        }}
      >
        <FaQuestion className="help-button-icon" />
      </Button>
      <UncontrolledPopover placement="right" target={safeId(identifier)} trigger="legacy" hideArrow>
        <Card>
          <CardHeader>{label}</CardHeader>
          <CardBody>{help}</CardBody>
        </Card>
      </UncontrolledPopover>
    </>
  )
}
