'use client';
import { ChartsInterface } from "@/app/interfaces/charts-interface";
import { BEST_CLIENTS } from "@/app/querys/clients-query";
import { useQuery } from "@apollo/client"
import { BestClients } from "@/app/interfaces/user-interface";
import { useEffect } from "react";
import BarChartComponent from "../../Charts/BarChart";

export default function BestClientsChart () {
  
  const { data, loading, error, startPolling, stopPolling } = useQuery(BEST_CLIENTS);

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    }
  }, [startPolling, stopPolling]);

  if(loading) return (
    <p>Loading...</p>
  )

  const { bestClients } = data; 

  const customerGraphic: ChartsInterface[] = [];

  bestClients.map(({ client, total }: BestClients, index: number) => {
    customerGraphic.push({
      name: `${client[0].firstName} ${client[0].lastName}`,
      total: total ,
    });
  }); 

  return (
    <BarChartComponent data={customerGraphic}/>
  )
}