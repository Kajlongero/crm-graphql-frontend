'use client';
import { ChartsInterface } from "@/app/interfaces/charts-interface";
import { BEST_SELLERS } from "@/app/querys/clients-query";
import { useQuery } from "@apollo/client"
import { BestSellers } from "@/app/interfaces/user-interface";
import { useEffect } from "react";
import BarChartComponent from "../../Charts/BarChart";

export default function BestSellersChart () {
  
  const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_SELLERS);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling]);

  if(loading) return (
    <p>Loading...</p>
  )

  const { bestSellers } = data; 

  const sellerGraphics: ChartsInterface[] = [];

  bestSellers.map(({ seller, total }: BestSellers, index: number) => {
    sellerGraphics.push({
      name: `${seller[0].firstName} ${seller[0].lastName}`,
      total: total ,
    });
  }); 

  return (
    <BarChartComponent data={sellerGraphics}/>
  )
}