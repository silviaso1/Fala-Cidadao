import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Charts.scss';

const CategoryChart = ({ reports }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const categoryCounts = {
      iluminacao: reports.filter(r => r.category === 'iluminacao').length,
      buraco: reports.filter(r => r.category === 'buraco').length,
      lixo: reports.filter(r => r.category === 'lixo').length,
      transito: reports.filter(r => r.category === 'transito').length,
      outros: reports.filter(r => !['iluminacao', 'buraco', 'lixo', 'transito'].includes(r.category)).length
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Iluminação', 'Buraco', 'Lixo', 'Trânsito', 'Outros'],
        datasets: [{
          data: [
            categoryCounts.iluminacao,
            categoryCounts.buraco,
            categoryCounts.lixo,
            categoryCounts.transito,
            categoryCounts.outros
          ],
          backgroundColor: '#0984E3',
          borderRadius: 6
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
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'white'
            },
            ticks: {
              color: 'white'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'white'
            }
          }
        }
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

export default CategoryChart;