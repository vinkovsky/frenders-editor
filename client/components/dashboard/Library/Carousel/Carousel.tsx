import React, {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useContext,
} from 'react'
import { Card as MuiCard, CardMedia } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import Slider from 'react-slick'

import { DashboardContext } from '@providers/DashboardProvider'
import * as ACTIONS from '@actions/dashboard/cards'
import { ICardProps } from '@interfaces/dashboard'

import { useStyles } from './Carousel.styles'

function SampleNextArrow(props) {
  const { className, style, onClick } = props

  return (
    <ChevronRight
      className={className}
      style={{ ...style, display: 'block', color: '#000' }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props

  return (
    <ChevronLeft
      className={className}
      style={{ ...style, display: 'block', color: '#000' }}
      onClick={onClick}
    />
  )
}

function Slide(props) {
  const { cardLibraryItem, key, handleClick, style } = props
  const classes = useStyles()

  return (
    <div
      key={key}
      style={{ ...style, outline: 'none', border: 'none', padding: '0 5px' }}
    >
      <MuiCard
        className={classes.card}
        onClick={(e) => handleClick(e, cardLibraryItem)}
      >
        <CardMedia
          image={cardLibraryItem.img.url}
          title={cardLibraryItem.title}
          className={classes.media}
        />
      </MuiCard>
    </div>
  )
}

const Carousel: FunctionComponent<any> = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(DashboardContext)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>, cardLibraryItem: ICardProps) => {
      dispatch(ACTIONS.setCurrentCard(cardLibraryItem))
    },
    []
  )

  return (
    <div className={classes.container}>
      <h4>Similar Models</h4>
      <Slider {...settings} className={classes.slider}>
        {state.cards.cardLibraryListData.map((cardLibraryItem: ICardProps) => {
          return (
            <Slide
              key={cardLibraryItem.title}
              cardLibraryItem={cardLibraryItem}
              handleClick={handleClick}
            />
          )
        })}
      </Slider>
    </div>
  )
}

export default Carousel
