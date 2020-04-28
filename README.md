# Mighty PollyTron!

## AWS Polly
The component uses AWS Polly serivce as the text-to-speech engine. To use it, you need to first create an IAM user with Polly permissions.
Keep these AccessKeyId and SecretAccessKey as they're needed, either in `credentials` file or as a direct input in the app config.

## How to use

**Coming shortly**: You'll be able to download executable and install it as a system app.

Assuming:
1. You have `node.js` and `yarn` installed
1. You have an AWS user with Polly permissions

Currently:
1. Checkout the package with `git clone https://github.com/laszukdawid/pollytron`
1. Install dependencies with `yarn install`. (You'll see some failures with `dll renderer` and it's fine.)
1. Start the app with `yarn start`. 

## State
Ok, before you get too excited please know one thing: too much excitment is a recipe for disappointment.

Regarding the state:
* can read (short-ish) text from the form
* can read (short-ish) text from the clipboard
* looks-up credentials (but not region) based on provided profile
* can stop long reads
* persists configuration

## Progress

The minimum usability requirement are met. Coming days/weeks will be focused on improving UI and making auto-release, so that an executable package is downloadable.

If anyone is actually looking at this repo, feel free to provide feature requests.

Remember to hit that star button, fork repo, tell all people, post on the Hacker News, donate to charity, wash your hands, wash your teeth, don't talk to strangers, make a will and be a good person.
