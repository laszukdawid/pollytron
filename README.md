# Mighty PollyTron!

## AWS Polly
The component uses AWS Polly serivce as the text-to-speech engine. To use it, you need to first create an IAM user with Polly permissions.
Keep these AccessKeyId and SecretAccessKey as they're needed, either in `credentials` file or as a direct input in the app config.

## State
Ok, before you get too excited please know one thing: too much excitment is a recipe for disappointment.

Regarding the state:
* the app starts
* finishes
* can read (short) text from the form
* looks-up credentials (but not region) based on provided profile
* can read (short) text from the clipboard
* can stop long reads

Yep, it's almost done. Just a few small cosmetic tweaks.

## Progress

I'm planning on adding a few killer features, e.g.:
* Proper instructions on how to build and use

Remember to hit that star button, fork repo, tell all people, post on the Hacker News, donate to charity, wash your hands, wash your teeth, don't talk to strangers, make a will and be a good person.
