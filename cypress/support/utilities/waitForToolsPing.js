const waitForToolsPing = () => {
    cy.intercept('/tools/ping/**').as('getToolsPing')
    cy.wait('@getToolsPing')
}
export default waitForToolsPing;