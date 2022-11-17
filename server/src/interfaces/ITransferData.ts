interface IUser {
  user: {
    username: string;
  }

}

interface ITransferData {
  value: number;
  createdAt: string;
  creditedAccount?: IUser;
  debitedAccount?: IUser;
  
}
export default interface ITransferType {
  cashIn?: ITransferData[] | [];
  cashOut?: ITransferData[] | [];
}