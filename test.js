
Feature('Sample Scenario')

Scenario('This is a test', async ({I}) => {
   I.say('Hello')
}).retry(1)