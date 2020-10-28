// Compiled using ts2gas 3.6.3 (TypeScript 3.9.7)
interface TLResponsibility {
    name: string;
    email: string;
}

interface SheetResponsibilty {
    responsibilityName: string;
    tls: TLResponsibility[];
}

const toEmailWarning = [
    presidentInfo.email,
    vicePresidentInfo.email,
];

type WarningFunctionType = ({ responsibilityName, tls }: SheetResponsibilty) => void;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function firstWarningCheck(): void {
    updateFormulas();
    checkBlanks(emailFirstWarning);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function secondWarningCheck(): void {
    checkBlanks(emailSecondWarning);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function thirdWarningCheck(): void {
    checkBlanks(emailThirdWarning);
}

function checkBlanks(warningFunction: WarningFunctionType): void {
    const weekNum = getWeekNum()

    let foundBlankSeminar = false;
    let foundBlankStudyS = false;
    let foundBlankFrontD = false;
    const seminar = getColumn(weekNum, WEEK_INFO.SEMINAR)
    const studySession = getColumn(weekNum, WEEK_INFO.STUDY_SESSION)
    const frontDesk = getColumn(weekNum, WEEK_INFO.FRONT_DESK)

    const seminarArray = seminar.getValues() as string[][];
    const studyArray = studySession.getValues() as string[][];
    const frontArray = frontDesk.getValues() as string[][];
    const firstEntry = 0;

    for (
        let row = 0;
        row < seminarArray.length &&
        !(foundBlankFrontD && foundBlankSeminar && foundBlankStudyS);
        row++
    ) {
        if (seminarArray[row][firstEntry] == "" && !foundBlankSeminar) {
            warningFunction(seminarFiller);
            foundBlankSeminar = true;
        }
        if (studyArray[row][firstEntry] == "" && !foundBlankStudyS) {
            warningFunction(studySessionFiller);
            Logger.log(`Study Session Empty at: ${scholarInfo[row].uid}`)
            foundBlankStudyS = true;
        }
        console.log(frontArray[row][firstEntry])
        if (frontArray[row][firstEntry] == "" && !foundBlankFrontD) {
            warningFunction(frontDeskFiller);
            Logger.log(`Front Desk Empty at: ${scholarInfo[row].uid}`)
            foundBlankFrontD = true;
        }
    }
}

function emailFirstWarning({ responsibilityName, tls }: SheetResponsibilty): void {
    const tlNames = tls.map((tl) => tl.name).join(",");
    const tlEmails = tls.map((tl) => tl.email).join(",");

    Logger.log("Email sent to: " + tlNames + " for " + responsibilityName);
    sendEmail(
        tlEmails,
        "[AUTOMATED EMAIL] Warning: " + responsibilityName + " not filled!",
        "This is an automated email.\n\n\n" +
        tlNames +
        ", \nYou did not complete your responsibility for " +
        responsibilityName +
        ". As a reminder, you must fill out " +
        responsibilityName +
        " by Friday at 5pm! Please email " +
        presidentInfo.email +
        " if you need an extension. Otherwise, an email will be sent to " +
        presidentInfo.name +
        " and " +
        vicePresidentInfo.name +
        " in 4 hours (9pm) that you did not complete your reponsibility.\n\n\n*IMPORTANT*\nIf this is a mistake, please text Anjola at (301) 254-8855."
    );
}

function emailSecondWarning({ responsibilityName, tls }: SheetResponsibilty): void {
    const tlNames = tls.map((tl) => tl.name).join(",");
    const tlEmails = tls.map((tl) => tl.email);

    Logger.log(
        "Email sent to: " + tlEmails.join(",") + " for " + responsibilityName
    );
    const toEmail = tlEmails.concat(toEmailWarning);

    sendEmail(
        toEmail.join(),
        "[AUTOMATED EMAIL] Warning: " + responsibilityName + " not filled!",
        "This is an automated email.\n\n\n" +
        tlNames +
        " did not complete their responsibility for " +
        responsibilityName +
        ". As a reminder, Team Leaders must fill out " +
        responsibilityName +
        " by Friday at 5pm! TL(s) were emailed at " +
        tlEmails.join() +
        " at 5pm, and this is the second warning email.\n\n\n*IMPORTANT*\nIf this is a mistake, please text Anjola at (301) 254-8855."
    );
}

function emailThirdWarning({ responsibilityName, tls }: SheetResponsibilty): void {
    const tlNames = tls.map((tl) => tl.name).join(",");
    const tlEmails = tls.map((tl) => tl.email);

    Logger.log(
        "Email sent to: " + tlEmails.join() + " for " + responsibilityName
    );
    const toEmail = tlEmails.concat(toEmailWarning);

    sendEmail(
        toEmail.join(),
        "[AUTOMATED EMAIL] Warning: " + responsibilityName + " not filled!",
        "This is an automated email.\n\n\n" +
        tlNames +
        " did not complete their responsibility for " +
        responsibilityName +
        ". As a reminder, Team Leaders must fill out [" +
        responsibilityName +
        "] by Friday at 5pm! TL(s) was emailed at " +
        tlEmails.join() +
        " on Friday at 5pm and 9pm, and this is the third warning email.\n\n*IMPORTANT*\nIf this is a mistake, please text Anjola at (301) 254-8855."
    );
}
