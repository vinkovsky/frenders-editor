export interface ILayoutEditorProps {
  openLeftPanel: boolean
  openRightPanel: boolean
  savedLayout: object
}

export interface IConfirmDialogProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: () => void
  isGroup: boolean
  dialogTitle: string
  dialogContent: string
}
