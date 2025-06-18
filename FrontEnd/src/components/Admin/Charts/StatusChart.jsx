import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Charts.scss';

const StatusChart = ({ reports }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const statusCounts = {
      pendente: reports.filter(r => r.status === 'denunciado').length,
      analise: reports.filter(r => r.status === 'em_andamento').length,
      resolvido: reports.filter(r => r.status === 'resolvido').length
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pendente', 'Em Análise', 'Resolvido'],
        datasets: [{
          data: [statusCounts.pendente, statusCounts.analise, statusCounts.resolvido],
          backgroundColor: [
            '#FDCB6E',
            '#0984E3',
            '#00B894'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        cutout: '70%'
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reports]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default StatusChart;