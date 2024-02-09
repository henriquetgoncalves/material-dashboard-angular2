import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  /*IA: 1 crie uma variável data que recebe a cada 1 segundo a data e hora atual formatada por 'dd/mm/aaaa hh:mm:ss'. 
  Crie no construtor um timer de 1 segundo para atualizar a variável data com a data e hora atual.
  E cada vez que for alterada, deve retornar para que o front consiga visualizar a alteração.
  Remover os blocos que a IA gerou duplicado*/
  data: string;

  constructor() {
    this.data = this.formatDate(new Date());
    setInterval(() => {
      this.data = this.formatDate(new Date());
    }, 1000);
    
    this.getTweets();
    setInterval(() => {
      this.getTweets();
    }, 300000);
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  //IA: 4 crie uma função simples que será chamada no construtor, que busca os últimos tweets referente ao GitHub Copilot e preencha numa nova variável para ser usada no front para exibir os 10 tweets mais recentes. 
  //A função deve ser chamada a cada 5 minutos.
  tweets: string[] = [];
  getTweets() {
    // IA: 5 Ajuste as mensagens da lista de tweets para parecer que são de usuários reais com datas e horas fictícias e diferentes para cada tweet, mensagens sobre o Github Copilot
    const currentDate = new Date();
    const tweets = [];

    for (let i = 1; i <= 10; i++) {
      const tweetDate = new Date(currentDate.getTime() - i * 1000 * 60 * 60);
      const formattedDate = this.formatDate(tweetDate);
      const tweetMessage = `Tweet ${i} - This is a sample tweet about GitHub Copilot - ${formattedDate}`;
      tweets.push(tweetMessage);
    }

    this.tweets = tweets;
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);


    //IA: 2 Crie um novo indicador para visualizações da página com dados fictícios assim como o CompletedTasks para o id=pageViewsChart

    /* ----------==========     Page Views Chart initialization    ==========---------- */

    const dataPageViewsChart: any = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [800, 1200, 1000, 1500, 2000, 1800, 2200, 2500, 2300, 1900, 2100, 2400]
      ]
    };

    const optionsPageViewsChart: any = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 3000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };

    const pageViewsChart = new Chartist.Bar('#pageViewsChart', dataPageViewsChart, optionsPageViewsChart);

    // Start animation for the Page Views Chart
    this.startAnimationForBarChart(pageViewsChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
