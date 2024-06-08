function Coin({ params }: { params: { coinId: string } }) {
  return <div>{params.coinId}</div>;
}

export default Coin;
