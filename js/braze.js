
function setBrazeAttr() {
    var externalUserId = getLocalStorageItem(StorageConst.EXTERNAL_USER_ID);

    if (externalUserId) {

        //CHANGE USER BY EXTERNAL USER ID

        appboy.changeUser(externalUserId, function () {

            appboy.getDeviceId(function (deviceId) {
                var skin = SonSkin;
                var language = getLocalStorageItem(StorageConst.SON_LANG_CODE);

                if (appboy.isPushSupported() && !appboy.isPushPermissionGranted() && !appboy.isPushBlocked()) {
                    appboy.logCustomEvent("prime-for-push-" + skin, { language: language });
                }

            });

        });
    }
}

function getLocalStorageItem(name) {
    return localStorage.getItem(name);
}

if (getLocalStorageItem(StorageConst.EVER_LOGGED_IN) === '1') {

    +function (a, p, P, b, y) { appboy = {}; appboyQueue = []; for (var s = "initialize destroy getDeviceId toggleAppboyLogging setLogger openSession changeUser requestImmediateDataFlush requestFeedRefresh subscribeToFeedUpdates logCardImpressions logCardClick logFeedDisplayed requestInAppMessageRefresh logInAppMessageImpression logInAppMessageClick logInAppMessageButtonClick logInAppMessageHtmlClick subscribeToNewInAppMessages removeSubscription removeAllSubscriptions logCustomEvent logPurchase isPushSupported isPushBlocked isPushGranted isPushPermissionGranted registerAppboyPushMessages unregisterAppboyPushMessages submitFeedback trackLocation stopWebTracking resumeWebTracking wipeData ab ab.User ab.User.Genders ab.User.NotificationSubscriptionTypes ab.User.prototype.getUserId ab.User.prototype.setFirstName ab.User.prototype.setLastName ab.User.prototype.setEmail ab.User.prototype.setGender ab.User.prototype.setDateOfBirth ab.User.prototype.setCountry ab.User.prototype.setHomeCity ab.User.prototype.setLanguage ab.User.prototype.setEmailNotificationSubscriptionType ab.User.prototype.setPushNotificationSubscriptionType ab.User.prototype.setPhoneNumber ab.User.prototype.setAvatarImageUrl ab.User.prototype.setLastKnownLocation ab.User.prototype.setUserAttribute ab.User.prototype.setCustomUserAttribute ab.User.prototype.addToCustomAttributeArray ab.User.prototype.removeFromCustomAttributeArray ab.User.prototype.incrementCustomUserAttribute ab.User.prototype.addAlias ab.InAppMessage ab.InAppMessage.SlideFrom ab.InAppMessage.ClickAction ab.InAppMessage.DismissType ab.InAppMessage.OpenTarget ab.InAppMessage.ImageStyle ab.InAppMessage.TextAlignment ab.InAppMessage.Orientation ab.InAppMessage.CropType ab.InAppMessage.prototype.subscribeToClickedEvent ab.InAppMessage.prototype.subscribeToDismissedEvent ab.InAppMessage.prototype.removeSubscription ab.InAppMessage.prototype.removeAllSubscriptions ab.InAppMessage.Button ab.InAppMessage.Button.prototype.subscribeToClickedEvent ab.InAppMessage.Button.prototype.removeSubscription ab.InAppMessage.Button.prototype.removeAllSubscriptions ab.SlideUpMessage ab.ModalMessage ab.FullScreenMessage ab.HtmlMessage ab.ControlMessage ab.Feed ab.Feed.prototype.getUnreadCardCount ab.Card ab.ClassicCard ab.CaptionedImage ab.Banner ab.WindowUtils display display.automaticallyShowNewInAppMessages display.showInAppMessage display.showFeed display.destroyFeed display.toggleFeed sharedLib".split(" "), i = 0; i < s.length; i++) { for (var m = s[i], k = appboy, l = m.split("."), j = 0; j < l.length - 1; j++)k = k[l[j]]; k[l[j]] = (new Function("return function " + m.replace(/\./g, "_") + "(){appboyQueue.push(arguments); return true}"))() } appboy.getUser = function () { return new appboy.ab.User }; appboy.getCachedFeed = function () { return new appboy.ab.Feed }; (y = p.createElement(P)).type = 'text/javascript'; y.src = 'https://js.appboycdn.com/web-sdk/2.1/appboy.min.js'; y.async = 1; (b = p.getElementsByTagName(P)[0]).parentNode.insertBefore(y, b) }(window, document, 'script');

    //STEP2: INIT APP BOY
    appboy.initialize('b74ff343-4524-4b07-90bb-aef24d776f18', { enableLogging: true, baseUrl: 'https://sdk.fra-01.braze.eu/api/v3' });

    //STEP 3: Subscirbe to messages
    appboy.subscribeToNewInAppMessages(function (inAppMessages) {
        var message = inAppMessages[0];
        if (message != null) {
            var shouldDisplay = true;

            if (message instanceof appboy.ab.InAppMessage) {
                var msgId = message.extras["msg-id"];

                // If this is our push primer message
                if (msgId === "push-primer") {
                    if (!appboy.isPushSupported() || appboy.isPushPermissionGranted() || appboy.isPushBlocked()) {
                        shouldDisplay = false;
                    }
                    if (message.buttons[0] != null) {
                        message.buttons[0].subscribeToClickedEvent(function () {
                            appboy.registerAppboyPushMessages();
                        });
                    }
                }
            }

            // Display the message
            if (shouldDisplay) {
                appboy.display.showInAppMessage(message);
            }
        }

        return inAppMessages.slice(1);
    });

    appboy.openSession(function () {
        //STEP 5: SET BRAZE ATTR
        setBrazeAttr();
    });
}