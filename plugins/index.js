let animals = [
  {
    id: 1,
    title: 'Сова',
    population: 20,
    img: 'https://cdnimg.rg.ru/img/content/181/83/21/sova_d_850.jpg',
  },
  {
    id: 2,
    title: 'Тигр',
    population: 10,
    img: 'https://www.rgo.ru/sites/default/files/styles/full_view/public/media/2021-02-11/134177763_2702674119984575_8615809597472330988_o.jpg?itok=hc8DUtFG',
  },
  {
    id: 3,
    title: 'Нерпа',
    population: 30,
    img: 'https://avatars.mds.yandex.net/get-zen_doc/127510/pub_5bc07d8f782b5d00aed4f6aa_5bc07e9728c0c700aae7bc1c/scale_1200',
  },
]

const toHTML = (animal) =>
  `<div class="col">
          <div class="card">
            <img
              src="${animal.img}" alt="${animal.img}"
              class="card-img-top"
              style="height: 300px"
            />
            <div class="card-body">
              <h5 class="card-title">${animal.title}</h5>
              <p class="card-text">
                Популяция составляет ${animal.population} миллионнов особей!
              </p>
              <a href="#" class="btn btn-primary" data-btn="show" data-id="${animal.id}">Посмотреть на него</a>
              <a href="#" class="btn btn-danger" data-btn="remove" data-id="${animal.id}">Скрыть</a>
            </div>
          </div>
        </div>
        `

function render() {
  const html = animals.map((animal) => toHTML(animal)).join('')
  document.querySelector('#getAnimals').innerHTML = html
}

const modalShow = $.modal({
  title: 'Temp title',
  closable: true,
  content: `
    <h4>Modal is working</h4>
    <p>Lorem ipsum dolor sit.</p>
    <p>Lorem ipsum dolor sit.</p>
    `,
  width: '400px',
  footerButtons: [
    {
      text: 'Ага',
      type: 'primary',
      handler() {
        console.log('Primary btn clicked')
        modalShow.close()
      },
    },
    {
      text: 'Угу',
      type: 'danger',
      handler() {
        console.log('Danger btn clicked')
        modalShow.close()
      },
    },
  ],
})

render()

document.addEventListener('click', (event) => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const animal = animals.find((f) => f.id === id)

  if (btnType === 'show') {
    modalShow.setContent(`
    <p>Популяция данного вида состовляет ${animal.population}. Особь данного вида называют <span>${animal.title}</span> </p>
    `)

    modalShow.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Окно ${animal.title} будет скрыто</p>`,
    })
      .then(() => {
        animals = animals.filter((f) => f.id !== id)
        render()
      })
      .catch(() => console.log('No deleted'))
  }
})
