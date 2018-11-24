import * as Chart from 'chart.js';

/* tslint:disable:max-line-length */


export class ModalComponent {

 getChart() {
  //// grupa ilości osob
  const ctx0: HTMLCanvasElement = document.getElementById(
    'chartWeek'
  ) as HTMLCanvasElement;
  ctx0.getContext('2d');
  const chartWeek = new Chart(ctx0, {
    type: 'bar',
    data: {
      labels: [
        'Poniedziałek',
        'Wtorek',
        'Środa',
        'Czwartek',
        'Piątek',
        'Sobota',
        'Niedziela'
      ],
      datasets: [
        {
          label: 'Ilość osób - meżczyźni',
          data: [10, 19, 30, 50, 21, 30, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(31, 190, 15, 0.5)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Ilość osób - kobiety',
          data: [10, 19, 30, 50, 21, 30, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(31, 190, 15, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Ilość osób na zajęciach w ostatnim tygodniu'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    }
  });

  const ctx1: HTMLCanvasElement = document.getElementById(
    'chartMonth'
  ) as HTMLCanvasElement;
  ctx1.getContext('2d');
  const chartMonth = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: [
        'Poniedziałek',
        'Wtorek',
        'Środa',
        'Czwartek',
        'Piątek',
        'Sobota',
        'Niedziela'
      ],
      datasets: [
        {
          label: 'Ilość osób - mężczyźni',
          data: [10, 19, 30, 50, 21, 30, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(31, 190, 15, 0.5)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Ilość osób - kobiety',
          data: [10, 19, 30, 50, 21, 30, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(31, 190, 15, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Ilość osób na zajęciach w ostatnim miesiącu'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    }
  });

  const ctx2: HTMLCanvasElement = document.getElementById(
    'chartSemester'
  ) as HTMLCanvasElement;
  ctx2.getContext('2d');
  const chartSemester = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: [
        'Poniedziałek',
        'Wtorek',
        'Środa',
        'Czwartek',
        'Piątek',
        'Sobota',
        'Niedziela'
      ],
      datasets: [
        {
          label: 'Ilość osób - mężczyźni',
          data: [102, 109, 30, 50, 20, 30, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(31, 190, 15, 0.5)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Ilość osób',
          data: [102, 109, 30, 50, 20, 30, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(31, 190, 15, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Ilość osób na zajęciach w semestrze'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    }
  });

  const ctx3: HTMLCanvasElement = document.getElementById(
    'chartAll'
  ) as HTMLCanvasElement;
  ctx3.getContext('2d');
  const chartAll = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: [
        'Poniedziałek',
        'Wtorek',
        'Środa',
        'Czwartek',
        'Piątek',
        'Sobota',
        'Niedziela'
      ],
      datasets: [
        {
          label: 'Ilość osób - mężczyźni',
          data: [1002, 1009, 300, 500, 200, 300, 100],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(31, 190, 15, 0.5)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Ilość osób - kobiety',
          data: [1002, 1009, 300, 500, 200, 300, 100],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(31, 190, 15, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(31, 190, 15, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Suma ilość osób na zajęciach'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true
          }
        ],
        yAxes: [
          {
            stacked: true
          }
        ]
      }
    }
  });

  ///// grupa siatki zajec

  const ctx4: HTMLCanvasElement = document.getElementById(
    'chartGrP1'
  ) as HTMLCanvasElement;
  ctx4.getContext('2d');
  const chartGrP1 = new Chart(ctx4, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255,99,132,1)',
          data: [1, 2, 3, 4, 4, 5, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w grupie P1'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx5: HTMLCanvasElement = document.getElementById(
    'chartGrP2'
  ) as HTMLCanvasElement;
  ctx5.getContext('2d');
  const chartGrP2 = new Chart(ctx5, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255,99,132,1)',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w grupie P2'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx6: HTMLCanvasElement = document.getElementById(
    'chartGrSrP'
  ) as HTMLCanvasElement;
  ctx6.getContext('2d');
  const chartGrSrP = new Chart(ctx6, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255,99,132,1)',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w grupie ŚR - PON'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx18: HTMLCanvasElement = document.getElementById(
    'chartGrSrS'
  ) as HTMLCanvasElement;
  ctx18.getContext('2d');
  const chartGrSrS = new Chart(ctx18, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255,99,132,1)',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w grupie ŚR - ŚR'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx7: HTMLCanvasElement = document.getElementById(
    'chartGrZaP'
  ) as HTMLCanvasElement;
  ctx7.getContext('2d');
  const chartGrZaP = new Chart(ctx7, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255,99,132,1)',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w grupie ZA - PON'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx17: HTMLCanvasElement = document.getElementById(
    'chartGrZaS'
  ) as HTMLCanvasElement;
  ctx17.getContext('2d');
  const chartGrZaS = new Chart(ctx17, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgba(255,99,132,1)',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w grupie ZA - ŚR'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx8: HTMLCanvasElement = document.getElementById(
    'chartGrPp'
  ) as HTMLCanvasElement;
  ctx8.getContext('2d');
  const chartGrPp = new Chart(ctx8, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: ['#343a40'],
          borderColor: ['#343a40'],
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w grupie P+'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx9: HTMLCanvasElement = document.getElementById(
    'chartGrNz'
  ) as HTMLCanvasElement;
  ctx9.getContext('2d');
  const chartGrNZ = new Chart(ctx9, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w nieznanych godzinach'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  // zmiana osob z dniach
  const ctx10: HTMLCanvasElement = document.getElementById(
    'chartDayMon'
  ) as HTMLCanvasElement;
  ctx10.getContext('2d');
  const chartDayMon = new Chart(ctx10, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w poniedziałki'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx11: HTMLCanvasElement = document.getElementById(
    'chartDayTue'
  ) as HTMLCanvasElement;
  ctx11.getContext('2d');
  const chartDayTue = new Chart(ctx11, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób we wtorki'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx12: HTMLCanvasElement = document.getElementById(
    'chartDayWed'
  ) as HTMLCanvasElement;
  ctx12.getContext('2d');
  const chartDayWed = new Chart(ctx12, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w środy'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx13: HTMLCanvasElement = document.getElementById(
    'chartDayThu'
  ) as HTMLCanvasElement;
  ctx13.getContext('2d');
  const chartDayThu = new Chart(ctx13, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w czwartki'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx14: HTMLCanvasElement = document.getElementById(
    'chartDayFri'
  ) as HTMLCanvasElement;
  ctx14.getContext('2d');
  const chartDayFri = new Chart(ctx14, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w piątki'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx15: HTMLCanvasElement = document.getElementById(
    'chartDaySat'
  ) as HTMLCanvasElement;
  ctx15.getContext('2d');
  const chartDaySat = new Chart(ctx15, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w soboty'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  const ctx16: HTMLCanvasElement = document.getElementById(
    'chartDaySun'
  ) as HTMLCanvasElement;
  ctx16.getContext('2d');
  const chartDaySun = new Chart(ctx16, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości osób w niedziele'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });

  ///////////////// wykres zmiany osob tydzien do tygodnia

  const ctx19: HTMLCanvasElement = document.getElementById(
    'chartWeekToWeek'
  ) as HTMLCanvasElement;
  ctx19.getContext('2d');
  const chartWeekToWeek = new Chart(ctx19, {
    type: 'line',
    data: {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
      datasets: [
        {
          label: 'Mężczyźni',
          backgroundColor: '#343a40',
          borderColor: '#343a40',
          data: [11, 2, 2, 4, 4, 35, 5],
          fill: false
        },
        {
          label: 'Kobiety',
          fill: false,
          backgroundColor: 'rgba(155, 159, 12, 1)',
          borderColor: 'rgba(155,159,12,1)',
          data: [7, 7, 8, 7, 4, 0, 1]
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Zmiana ilości w poszczególnych tygodniach'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tydzień'
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Ilość'
            }
          }
        ]
      }
    }
  });
}
}
