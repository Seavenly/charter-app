/* eslint-env browser */
import React from 'react';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';

import styled from '@src/styledComponents';
import { ITrip } from '@src/store/data/trips';
import Button from '@src/components/Button';

interface IProps {
  /** Trip data object */
  trip: ITrip;
  /** Have the images from all trips for this day loaded */
  onLoaded: () => void;
}

const Trip: React.StatelessComponent<IProps> = ({ trip, onLoaded }) => {
  if (typeof trip.boat === 'string') {
    return null;
  }
  return (
    <Wrapper>
      <Top>
        <ImageWrapper>
          <ImageOverlay style={{ background: trip.boat.color }} />
          <img src={trip.boat.image} alt={trip.boat.name} onLoad={onLoaded} />
        </ImageWrapper>
        <Info>
          <div>
            <BoatName>{trip.boat.name}</BoatName> {trip.boat.size}
          </div>
          <Time>
            <Type style={{ color: trip.boat.color }}>
              {dateFns.getHours(trip.start) < 12 ? 'AM' : 'PM'}
            </Type>
            <span>
              {dateFns.format(new Date(trip.start), 'h:mm A')} -{' '}
              {dateFns.format(new Date(trip.end), 'h:mm A')}
            </span>
          </Time>
        </Info>
      </Top>
      <Bottom>
        <Link
          to={`/book/${dateFns.format(trip.day, 'YYYY-MM-DD')}/${trip.id}`}
          href={`/book/${trip.id}`}
        >
          <Button>Book Now</Button>
        </Link>
      </Bottom>
    </Wrapper>
  );
};

export default Trip;

/**
 * =================
 * Styled Components
 * =================
 */

const Wrapper = styled.div`
  margin: auto;
  position: relative;
  box-shadow: 0 0.2rem 0 0 #ddd;
  border-radius: 0.2rem;
  overflow: hidden;
`;
const Top = styled.div`
  position: relative;
`;
const ImageWrapper = styled.div`
  position: relative;
  line-height: 0;
`;
const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.8;
`;
const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  color: white;
  z-index: 2;
  text-align: left;
`;
const BoatName = styled.h3`
  display: inline-block;
`;
const Time = styled.div`
  border: 1px solid white;
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  span {
    padding: 0.5rem;
  }
`;
const Type = styled.span`
  background: white;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
`;
const Bottom = styled.div`
  padding: 0.5rem;
  text-align: right;
`;
