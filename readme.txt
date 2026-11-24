--Readme document for Michelle Makhija, Kayla Zhang, makhijam@uci.edu, kaylaz2@uci.edu, makhijam, kaylaz2--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 10/1 The ability to log overnight sleep
- 10/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
10


3. What online resources did you consult when completing this assignment? (list specific URLs)
- Capacitor Preferences (storage): https://capacitorjs.com/docs/apis/preferences
- Ionic Tabs: https://ionicframework.com/docs/api/tabs
- Ionic Datetime: https://ionicframework.com/docs/api/datetime
- Ionic Item Sliding (swipe to edit/delete): https://ionicframework.com/docs/api/item-sliding
- Ionic Segment (filter): https://ionicframework.com/docs/api/segment
- Ionic Modal (edit dialog): https://ionicframework.com/docs/api/modal
- Ionic Toast / Undo action: https://ionicframework.com/docs/api/toast
- Ionic theming and CSS variables: https://ionicframework.com/docs/theming/css-variables
- Stanford Sleepiness Scale: https://web.stanford.edu/~dement/sss.html


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
just teammate.


5. Is there anything special we need to know in order to run your code?
no.


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
We designed it for college students, who often have irregular sleep schedules and want a fast, low-effort way to track their sleep.
This shaped choices like logging a full night in the morning and quick one-tap sleepiness check-ins during the day.


7. Did you design your app specifically for iOS or Android, or both?
We prioritized iOS by using iOS-style large titles, inset lists, back buttons, and date pickers that open in a pop-up.
Since we used standard Ionic components, the app still adapts for Android.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
From the homescreen, the user taps "Log last night" and confirms their bedtime and wake-up time, which are prefilled with a typical night (11PM to 7 AM).
Since our users log int he morning, pre-fileld times mean most logs only need a small adjustments, and time pickers prevent typing errors.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?

The user taps "Log sleepiness," picks one of the seven Stanford Sleepiness Scale levels (with descritpions), and the time defaults to now but can be changed.
Showing full descritpions help new users choose acccurately and defaulting to now keeps logging quick.

10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
The Home tab shows an at-a-glance dashboard with last night's sleep and the latest sleepiness rating, while the History tab lists every log newest-first with a filter for All, Sleep, or Sleepiness.
We split it this way so the first screen gives a quick, useful summary, and History is there when the user wants to review, edit, or delete past entries.


11. Which feature choose--using a native device resource, backing up logged data, or both?
Backing up logged data


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
N/A used logged data instead


13. If you backed up logged data, where does it back up to?
Logs are saved with Capacitor Preferences, which uses local storage in the browser and permanenet native storage ona  device. 
Data saves after every change and reloads when the app opens and is still there after closing or refreshing.

14. How does your app implement or follow principles of good mobile design?
Useful initial view: the Home tab opens on a dashboard summarizing last night's sleep and the most recent sleepiness rating instead of a blank list. Uh-oh button: deleting a log shows an "Undo" action in a toast so a mistaken delete is easy to recover, and delete first asks for confirmation. Error prevention: logging uses date/time pickers and a tap-to-select scale rather than free text, with validation that stops wake times before bedtime, future times, sleep over 24 hours, and double-logging the same morning. Platform conventions: we follow iOS patterns (large collapsing titles, a bottom tab bar, back buttons, pop-up date pickers, and swipe-to-reveal edit/delete), and a consistent "night sky" indigo theme with light/dark support ties the screens together.

Demo timestamps:
0:00 Initial view (empty Home)
0:02 Log over night sleep (pre-filled times); 0:15 saved, Home updates
0:23 Error Prevention: already logged this mroning, over 24 hours, wake-up before bedtime
0:48 Log an earlier night (Nov 20)
0:57 Log sleepiness (save disabeled until a level is picked); 1:02 Home updates
1:04 History tab with All/ Sleep / Sleepiness
1:13 Edit an overnight log; 1:25 edit a sleepiness log
1:30 Delete with Undo ("uh-oh" button)
1:41 Page reload: all data is still there (saved with Capacitor Preferences)