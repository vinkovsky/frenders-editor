import React, {
  useContext,
  useEffect,
  useState,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
  useCallback,
  ChangeEvent,
  FunctionComponent,
} from 'react'
import {
  ClickAwayListener,
  Grid,
  InputBase,
  TextField,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useMutation } from '@apollo/client'

import { IconButton, Tooltip } from '@ui/index'
import { ISavedCardMutationProps, ISavedCardProps } from '@interfaces/dashboard'
import * as ACTIONS from '@actions/dashboard/cards'
import { DashboardContext } from '@providers/DashboardProvider'
import { renameGroupSavedCardUser } from '@utils/dashboard/dashboard'
import CardSavedList from '../CardSavedList'
import DialogConfirm from '../DialogConfirm'

import UPDATE_SAVED_CARD from '@graphql/mutations/dashboard/UpdateSavedCard'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#3f50b5',
    color: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expandIcon: {
    order: -1,
    marginRight: 8,
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: 312,
    overflowY: 'scroll',
    flexDirection: 'column',
  },
}))(MuiAccordionDetails)

// Сортировка групп по имени
const Sorter = (property) => {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}

import { useStyles } from './SaveProjects.styles'

const SaveProjects: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(DashboardContext)
  const [savedCardsByGroup, setSavedCardsByGroup] = useState<any>({})
  const [readonly, setReadonly] = useState<boolean[]>([])
  const [text, setText] = useState<string[]>([])
  const [open, setOpen] = useState<boolean>(false)

  const [update] = useMutation<ISavedCardMutationProps>(UPDATE_SAVED_CARD)

  const handleClose = useCallback(() => setOpen(false), [])

  // Привязка карт к отсортированным группам
  useEffect(() => {
    if (state.cards.savedCards) {
      const groupSavedCards = {}
      setSavedCardsByGroup({})
      state.cards.savedCards.sort(Sorter('-nameGroup'))
      state.cards.savedCards.forEach((copySavedCard: ISavedCardProps) => {
        const group = copySavedCard.nameGroup.toUpperCase()
        if (typeof groupSavedCards[group] == 'undefined')
          groupSavedCards[group] = []
        groupSavedCards[group].push(copySavedCard)
      })
      setSavedCardsByGroup(groupSavedCards)
    }
  }, [state.cards])

  useEffect(() => {
    Object.keys(savedCardsByGroup).map((savedCardByGroup: string) => {
      setText((text: string[]) => text.concat(savedCardByGroup))
      setReadonly((readonly: boolean[]) => readonly.concat(true))
    })
  }, [savedCardsByGroup])

  const changeText = (target: string, index: number) => {
    const newArr = [...text]
    newArr[index] = target
    setText(newArr)
  }

  const changeReadonly = (index: number, stateReadonly: boolean) => {
    const newArr = [...readonly]
    newArr[index] = stateReadonly
    setReadonly(newArr)
  }

  const handleKeyPress = useCallback(
    async (
      event: KeyboardEvent,
      index: number,
      savedCardsByGroupItem: string
    ) => {
      if (event.key === 'Enter') {
        changeReadonly(index, true)
        if (text[index].length === 0) {
          changeText(savedCardsByGroupItem, index)
        } else {
          await renameGroupSavedCardUser(
            state,
            update,
            savedCardsByGroupItem,
            text[index]
          )
        }
      }
    },
    [state, update, text]
  )

  const handleRenameClick = (
    event: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation()
    changeReadonly(index, false)
  }

  const handleDeleteClick = useCallback(
    async (
      event: MouseEvent<HTMLButtonElement>,
      savedCardsByGroupItem: string
    ) => {
      event.stopPropagation()
      dispatch(ACTIONS.setCurrentGroup(savedCardsByGroupItem))
      setOpen(true)
    },
    []
  )

  const handleInputClick = (
    event: MouseEvent<HTMLInputElement> | any,
    index: number
  ) => {
    event.stopPropagation()
    changeText(event.target.value.toUpperCase(), index)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    changeText(event.target.value.toUpperCase(), index)
  }

  const handleClickAway = (event: MouseEvent<Document>, index: number) =>
    changeReadonly(index, true)

  return (
    <>
      {Object.keys(savedCardsByGroup).length > 0
        ? Object.keys(savedCardsByGroup).map(
          (savedCardsByGroupItem: string, index: number) => {
            return (
              <div className={classes.root} key={savedCardsByGroupItem}>
                <Accordion defaultExpanded>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}
                  >
                    {readonly[index] ? (
                      <InputBase
                        onClick={(event: MouseEvent<HTMLInputElement>) =>
                          handleInputClick(event, index)
                        }
                        onFocus={(event: FocusEvent<HTMLInputElement>) =>
                          event.stopPropagation()
                        }
                        value={
                          text.length ? text[index] : savedCardsByGroupItem
                        }
                        inputProps={{ readOnly: readonly[index] }}
                        style={{ color: '#fff' }}
                      />
                    ) : (
                      <ClickAwayListener
                        onClickAway={(event: MouseEvent<Document>) =>
                          handleClickAway(event, index)
                        }
                      >
                        <TextField
                          autoFocus
                          value={text[index]}
                          onFocus={(event: FocusEvent<HTMLInputElement>) =>
                            event.stopPropagation()
                          }
                          inputProps={{
                            readOnly: readonly[index],
                            maxLength: 12,
                          }}
                          onClick={(event: MouseEvent<HTMLInputElement>) =>
                            handleInputClick(event, index)
                          }
                          onChange={(
                            event: ChangeEvent<
                              HTMLInputElement | HTMLTextAreaElement
                            >
                          ) => handleChange(event, index)}
                          onKeyPress={(event: KeyboardEvent) =>
                            handleKeyPress(
                              event,
                              index,
                              savedCardsByGroupItem
                            )
                          }
                        />
                      </ClickAwayListener>
                    )}
                    <Grid
                      container
                      spacing={2}
                      justify={'flex-end'}
                      className={classes.icons}
                    >
                      <Grid item>
                        <Tooltip title={'Rename'} arrow>
                          <IconButton
                            icon={'rename'}
                            disabled={!readonly[index]}
                            onClick={(event) =>
                              handleRenameClick(event, index)
                            }
                            onFocus={(event: FocusEvent<HTMLButtonElement>) =>
                              event.stopPropagation()
                            }
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip title={'Delete'} arrow>
                          <IconButton
                            icon={'delete'}
                            onClick={(event) =>
                              handleDeleteClick(event, savedCardsByGroupItem)
                            }
                            onFocus={(event: FocusEvent<HTMLButtonElement>) =>
                              event.stopPropagation()
                            }
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CardSavedList
                      cardsSavedData={
                        savedCardsByGroup[savedCardsByGroupItem]
                      }
                    />
                  </AccordionDetails>
                </Accordion>
              </div>
            )
          }
        )
        : 'No saved projects'}
      <DialogConfirm
        id="delete-card-group-dialog"
        keepMounted
        open={open}
        onClose={handleClose}
        isGroup
        dialogTitle={'Confirmation of deleting a project group'}
        dialogContent={'You definitely want to delete this group of projects?'}
      />
    </>
  )
}

export default SaveProjects
