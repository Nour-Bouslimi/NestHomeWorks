/* eslint-disable prettier/prettier */
export class MoteurRepository {
  status: string="off";
    start() {
    this.status="on";
  }

   getStatus() {
    return this.status;
  }
}
