const waitFor = (element, timeout) => {
	for(let i=0; i<timeout/500; i++) {
        cy.wait(500);
        if(element()) {
          return;
        }
    }   	
}
export default waitFor