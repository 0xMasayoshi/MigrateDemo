import React, { useRef } from 'react'
import { TextField, InputAdornment, IconButton, Tooltip } from '@material-ui/core/'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

export function Address({ address }) {
  const addressRef = useRef(null)

  return (
    <Tooltip title={address ?? ''} placement="top">
      <TextField
        type={'text'}
        value={address}
        inputRef={addressRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  addressRef.current.select()
                  document.execCommand('copy')
                }}
              >
                <FileCopyOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Tooltip>
  )
}
