import { useState, useMemo, Fragment } from 'react'
import { Autocomplete, TextField, CircularProgress } from '@mui/material'

// This component will render a dropdown menu used to pick a player whose details will be shown.
export default function DropdownMenu({ players, selected, setSelected }) {
  const [inputValue, setInputValue] = useState('')

  const menuData = useMemo(() => {
    const playersArray = []
    for (let player of players) {
      playersArray.push(player)
    }
    return playersArray
  }, [players])

  const loadingMenu = (
    <TextField
      disabled
      placeholder='Loading'
      sx={{ width: 400, padding: '3em 0' }}
      InputProps={{ endAdornment: (<Fragment>{<CircularProgress color="inherit" size={20} />}</Fragment>), }}
    />
  )

  const menu = (
    <Autocomplete
      options={menuData}
      value={selected}
      onChange={(_, newValue) => setSelected(newValue)}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      sx={{ width: 400, padding: '3em 0' }}
      renderInput={params => (<TextField {...params} label="Player" />)}
    />
  )

  return players.size === 0 ? loadingMenu : menu
}
