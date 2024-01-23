describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('displays the resources text', () => {
    cy.get('h2')
    .contains('I'm Megan Barnes, a Ph.D. student at the <a href = "lt.unt.edu"> University of North Texas</a>, studying learning technologies. Join me on this journey as I grow as an academic, and share my excitement for technology, research, and the human side of technology with the world.');
  })
  it('renders the image', () => {
    cy.get('img')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0);
    })
  })
})
