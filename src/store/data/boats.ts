/** Input type for adding a new boat */
export interface IBoatInput {
  /** Name of the boat */
  name: string;
  /** Size of the boat in feet */
  size: string;
  /** Base cost to book the boat */
  price: number;
  /** Per person cost after the base count is reached */
  perPerson: number;
  /** Number of people included in the base price */
  baseCount: number;
  /** Maximum amount of people */
  cap: number;
  /** Accent color for the front end */
  color?: string;
  /** Image of the boat for the front end */
  image?: string;
}

/** How data is stored and pulled from the database */
export interface IBoat extends IBoatInput {
  id: string;
}

const data: ReadonlyArray<IBoat> = [
  {
    id: '1',
    name: 'Net Profits',
    price: 1025,
    perPerson: 90,
    baseCount: 10,
    cap: 47,
    size: "52'",
    color: '#82292a',
    image:
      'http://chesapeakebaysportfishing.com/images/7/4/c/0/8/74c08edd50cce79ff264d4a65aa19072348346a7-netprofits.jpeg',
  },
  {
    id: '2',
    name: 'Jessie Girl',
    price: 845,
    perPerson: 90,
    baseCount: 8,
    cap: 42,
    size: "52'",
    color: '#00838F',
    image:
      'http://chesapeakebaysportfishing.com/images/e/8/f/a/c/e8fac156e0b19b413ca4bbcf86343ee26e12ba07-jessiegirl.jpeg',
  },
];

export default data;
