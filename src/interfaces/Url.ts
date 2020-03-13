import Owner from './Owner';

export default class Url {
  constructor(public Id: string,
              public directory: string,
              public redirect: string,
              public clicks: number,
              public description: string,
              public image: string,
              public title: string,
              owner?: Owner) {}
}
