/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';

function formatTripTime(time) {
  return dateFns.format(
    new Date(0, 1, 1, +time.substring(0, 2), +time.substring(2)),
    'h:mm A',
  );
}

const Trip = ({ trip, loaded }) => (
  <Wrapper>
    <Top>
      <ImageWrapper>
        <ImageOverlay style={{ background: trip.boat.color }} />
        <img
          src={trip.boat.image}
          alt={trip.boat.name}
          onLoad={() => loaded()}
        />
      </ImageWrapper>
      <Info>
        <div>
          <BoatName>{trip.boat.name}</BoatName> {trip.boat.size}
        </div>
        <Time>
          <Type style={{ color: trip.boat.color }}>
            {+trip.start.substring(0, 2) < 12 ? 'AM' : 'PM'}
          </Type>
          <span>
            {formatTripTime(trip.start)} - {formatTripTime(trip.end)}
          </span>
        </Time>
      </Info>
    </Top>
    <Bottom>
      <Link to={`/book/${trip.id}`} href={`/book/${trip.id}`}>
        <Button>Book Now</Button>
      </Link>
    </Bottom>
  </Wrapper>
);

Trip.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.number,
    boat: PropTypes.object,
    day: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    booked: PropTypes.bool,
  }).isRequired,
  loaded: PropTypes.func.isRequired,
};

export default Trip;

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
