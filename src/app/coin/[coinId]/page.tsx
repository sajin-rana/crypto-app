function Coin({ params }: { params: { coinId: string } }) {
  return <div className="text-white">{params.coinId}</div>;
}

export default Coin;
