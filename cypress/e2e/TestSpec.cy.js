describe('General User Test', () => {
  it('Login test', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('testing@test.com')
    cy.get('[data-testid="action-password"]').type('testing123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('User').should('exist')
  })

  it('Logout test', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('testing@test.com')
    cy.get('[data-testid="action-password"]').type('testing123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('User').should('exist').click()
    cy.contains('Logout').should('exist').click()
    cy.get('[data-testid="action-confirm"]').click()

    cy.contains('User').should('not.exist')
  })

  it('Read News Article Test', () => {
    cy.visit('http://localhost:3090/article/1')

    cy.contains('Published').should('exist')
    cy.contains('Topic').should('exist')
    cy.contains('Author').should('exist')
    cy.contains('Comments').should('exist')
  })

  it('Comment Test', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('testing@test.com')
    cy.get('[data-testid="action-password"]').type('testing123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('User').should('exist')

    cy.contains('Prabowo').should('exist').click()
    cy.get('[data-testid="action-comment"]').type('This is an E2E test')
    cy.contains('Send Comment').click()
  })
})

describe('Journalist User Test', () => {
  it('Login test', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('z.mardi@dipadunia.id')
    cy.get('[data-testid="action-password"]').type('Password123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('Journalist').should('exist')
  })
  it('Journalist Create Article Page', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('z.mardi@dipadunia.id')
    cy.get('[data-testid="action-password"]').type('Password123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('Journalist').should('exist').click()
    cy.contains('Create Article').should('exist').click()

    cy.contains('Title').should('exist')
    cy.contains('Topic').should('exist')
    cy.contains('Content').should('exist')
  })
  it('Journalist Edit Article Page', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('z.mardi@dipadunia.id')
    cy.get('[data-testid="action-password"]').type('Password123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('Journalist').should('exist').click()
    cy.contains('Your Article').should('exist').click()

    cy.contains('Edit').should('exist').click()

    cy.contains('Title').should('exist')
    cy.contains('Topic').should('exist')
    cy.contains('Content').should('exist')
  })
})

describe('Admin User Test', () => {
  it('Login test', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('j.doe@dipadunia.id')
    cy.get('[data-testid="action-password"]').type('Password123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('Admin').should('exist')
  })

  it('Admin menu', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('j.doe@dipadunia.id')
    cy.get('[data-testid="action-password"]').type('Password123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('Admin').should('exist').click()
    cy.contains('Create Journalist').should('exist')
    cy.contains('Create Admin').should('exist')
    cy.contains('Topics').should('exist')
  })

  it('Topic control', () => {
    cy.visit('http://localhost:3090')

    cy.contains('Login').click()

    cy.get('[data-testid="action-email"]').type('j.doe@dipadunia.id')
    cy.get('[data-testid="action-password"]').type('Password123')
    cy.get('[data-testid="action-login"]').click()

    cy.contains('Admin').should('exist').click()
    cy.contains('Topics').should('exist').click()

    cy.contains('Topic Control').should('exist')
    cy.contains('Rename Topic').should('exist')
    cy.contains('Create Topic').should('exist')
    cy.contains('Delete Topic').should('exist')
    cy.contains('Topic Statistics').should('exist')
  })
})