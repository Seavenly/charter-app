import { IBoat } from './boats';

/** Input type for adding a new trip */
export interface ITripInput {
  /** ID reference to Boat Type */
  boat: string | IBoat;
  /** Scheduled trip date */
  day: string;
  /** Trip starting time */
  start: string;
  /** Trip ending time */
  end: string;
}

/** How data is stored and pulled from the database */
export interface ITrip extends ITripInput {
  id: string;
  /** Is the trip currently booked */
  booked: boolean;
  /**
   * Total confirmed people for the trip
   * @todo Make sure this field is blocked upon request
   */
  totalPeople: number;
  /**
   * Client who booked the trip
   * @todo Make sure this field is blocked upon request
   */
  client: string | null;
}

export interface ITripsData {
  readonly [year: string]: {
    readonly [month: string]: {
      readonly [day: string]: ReadonlyArray<ITrip>;
    };
  };
}

const data: ITripsData = {
  '2017': {
    '9': {
      '11': [
        {
          id: '1',
          boat: '1',
          day: '2017-09-11T00:00:00-05:00',
          start: '2017-09-11T06:00:00-05:00',
          end: '2017-09-11T13:00:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '2',
          boat: '1',
          day: '2017-09-11T00:00:00-05:00',
          start: '2017-09-11T13:30:00-05:00',
          end: '2017-09-11T19:30:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '3',
          boat: '2',
          day: '2017-09-11T00:00:00-05:00',
          start: '2017-09-11T06:00:00-05:00',
          end: '2017-09-11T13:00:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '4',
          boat: '2',
          day: '2017-09-11T00:00:00-05:00',
          start: '2017-09-11T13:30:00-05:00',
          end: '2017-09-11T19:30:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
      ],
      '12': [
        {
          id: '5',
          boat: '1',
          day: '2017-09-12T00:00:00-05:00',
          start: '2017-09-12T06:00:00-05:00',
          end: '2017-09-12T13:00:00-05:00',
          booked: true,
          totalPeople: 11,
          client: '1',
        },
        {
          id: '6',
          boat: '1',
          day: '2017-09-12T00:00:00-05:00',
          start: '2017-09-12T13:30:00-05:00',
          end: '2017-09-12T19:30:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '7',
          boat: '2',
          day: '2017-09-12T00:00:00-05:00',
          start: '2017-09-12T06:00:00-05:00',
          end: '2017-09-12T13:00:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '8',
          boat: '2',
          day: '2017-09-12T00:00:00-05:00',
          start: '2017-09-12T13:30:00-05:00',
          end: '2017-09-12T19:30:00-05:00',
          booked: true,
          totalPeople: 8,
          client: '3',
        },
      ],
      '13': [
        {
          id: '9',
          boat: '1',
          day: '2017-09-13T00:00:00-05:00',
          start: '2017-09-13T06:00:00-05:00',
          end: '2017-09-13T13:00:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '10',
          boat: '1',
          day: '2017-09-13T00:00:00-05:00',
          start: '2017-09-13T13:30:00-05:00',
          end: '2017-09-13T19:30:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '11',
          boat: '2',
          day: '2017-09-13T00:00:00-05:00',
          start: '2017-09-13T06:00:00-05:00',
          end: '2017-09-13T13:00:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '12',
          boat: '2',
          day: '2017-09-13T00:00:00-05:00',
          start: '2017-09-13T13:30:00-05:00',
          end: '2017-09-13T19:30:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
      ],
      '14': [
        {
          id: '13',
          boat: '1',
          day: '2017-09-14T00:00:00-05:00',
          start: '2017-09-14T06:00:00-05:00',
          end: '2017-09-14T13:00:00-05:00',
          booked: true,
          totalPeople: 10,
          client: '2',
        },
        {
          id: '14',
          boat: '1',
          day: '2017-09-14T00:00:00-05:00',
          start: '2017-09-14T13:30:00-05:00',
          end: '2017-09-14T19:30:00-05:00',
          booked: true,
          totalPeople: 10,
          client: '1',
        },
        {
          id: '15',
          boat: '2',
          day: '2017-09-14T00:00:00-05:00',
          start: '2017-09-14T06:00:00-05:00',
          end: '2017-09-14T13:00:00-05:00',
          booked: true,
          totalPeople: 10,
          client: '2',
        },
        {
          id: '16',
          boat: '2',
          day: '2017-09-14T00:00:00-05:00',
          start: '2017-09-14T13:30:00-05:00',
          end: '2017-09-14T19:30:00-05:00',
          booked: true,
          totalPeople: 8,
          client: '3',
        },
      ],
      '15': [
        {
          id: '17',
          boat: '1',
          day: '2017-09-15T00:00:00-05:00',
          start: '2017-09-15T06:00:00-05:00',
          end: '2017-09-15T13:00:00-05:00',
          booked: true,
          totalPeople: 8,
          client: '3',
        },
        {
          id: '18',
          boat: '1',
          day: '2017-09-15T00:00:00-05:00',
          start: '2017-09-15T13:30:00-05:00',
          end: '2017-09-15T19:30:00-05:00',
          booked: true,
          totalPeople: 14,
          client: '1',
        },
        {
          id: '19',
          boat: '2',
          day: '2017-09-15T00:00:00-05:00',
          start: '2017-09-15T06:00:00-05:00',
          end: '2017-09-15T13:00:00-05:00',
          booked: false,
          totalPeople: 0,
          client: null,
        },
        {
          id: '20',
          boat: '2',
          day: '2017-09-15T00:00:00-05:00',
          start: '2017-09-15T13:30:00-05:00',
          end: '2017-09-15T19:30:00-05:00',
          booked: true,
          totalPeople: 11,
          client: '2',
        },
      ],
    },
  },
};

export default data;
