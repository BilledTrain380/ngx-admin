
// tslint:disable: max-line-length
export const LANG_DE = {

    participation: {
        title: {
            default: 'Teilnahme',
            resetParticipation: 'Teilnahme zurücksetzen',
            groupsWithPendingParticipation: 'Gruppen mit noch offenen Teilnahmen',
        },
        status: {
            closed: 'Teilnahme ist abgeschlossen',
            open: 'Teilnahme ist offen',
        },
        action: {
            close: 'Abschliessen',
            reset: 'Zurücksetzen',
            lateParticipation: 'Nachmeldung',
        },
        alert: {
            resetSuccess: 'Die Teilnahme wurde zurückgesetzt.',
            closeParticipation: 'Wenn Sie die Teilnahme abschliessen, kann ein Teinehmer nur noch durch eine Ummeldung einer anderen Sportart zugewiesen werden.',
            resetParticipation: 'Wenn Sie die Teilnahme zurücksetzen werden alle Teilnehmer Daten unwiederruflich gelöscht.',
            confirmReset: 'Möchten Sie die Teilnahme wirklich zurücksetzen?',
        },
        text: {
            toCloseParticipation: 'Um die Leichtathletik starten zu können, müssen Sie die Teinahme abschliessen.<br>Dadurch werden die Startnummern generiert und Sie können die Wettkampfblätter herunterladen.',
            toResetParticipation: 'Um die Datenerfassung von neuem zu beginnen müssen Sie die Teilnahme zurücksetzens.<br>Dadurch werden alle Teilnehmer Daten gelöscht und Sie können die Teilnehmer von Anfang neu erfassen.',
        },
        label: {
            sports: 'Sportart',
        },
    },

    group: {
        title: {
            default: 'Gruppe',
            groups: 'Gruppen',
            overview: 'Übersicht',
            participants: 'Teilnehmer',
            csvFormat: 'CSV Format',
        },
        action: {
            import: 'Import',
        },
        status: {
            withPendingParticipation: 'offene Teilnehmer',
            withNoPendingParticipation: 'Teilnahme abgeschlossen',
            noGroups: 'Es sind keine Gruppen vorhanden.',
        },
        alert: {
            importSuccess: 'Gruppen wurden importiert.',
            fileUploadError: 'Die Datei konnte nicht hochgeladen werden.',
        },
        label: {
            actions: 'Aktionen',
        },
        text: {
            fileRequirements: '<li>Muss die Dateiendung <mark>.csv</mark> entsprechen</li>\n' +
                '        <li>\n' +
                '            Muss die folgende Reihenfolge der Attribute einhalten:<br>\n' +
                '            <i>Gruppe,Nachname,Vorname,Geschlecht,Strasse,PLZ,Ort,Geburtsdatum,Gruppenleiter</i>\n' +
                '        </li>\n' +
                '        <li>Das Geschlecht muss <mark>m</mark> für Knaben und <mark>w</mark> für Mädchen entsprechen</li>\n' +
                '        <li>Das Gebutsdatum muss dem Format <mark>dd.MM.YYYY</mark> entsprechen; z.B. 06.10.2009 </li>\n' +
                '        <li>Das Trennzeichen muss dem Komma (,) entsprechen</li>',
        },
    },

    participant: {
        label: {
            prename: 'Vorname',
            surname: 'Nachname',
            gender: 'Geschlecht',
            birthday: 'Geburtstag',
            address: 'Adresse',
            zipCode: 'PLZ',
            town: 'Ortschaft',
            absent: 'Abwesend',
        },
        alert: {
            confirmDelete: 'Möchten Sie den Teilnehmer \'{{ name }}\' wirklich löschen?',
            createSuccess: 'Der Teilnehmer wurde erstellt.',
            saveSuccess: 'Der Teilnehmer wurde gespeichert.',
            deleteSuccess: 'Der Teilnehmer wurde gelöscht.',
        },
    },

    athleticsPage: {
        results: {
            title: {
                default: 'Resultate',
                competitors: 'Wettkämpfer',
                absentCompetitors: 'Abwesende Wettkämpfer',
            },
            label: {
                startNumber: 'Startnummer',
                surname: 'Nachname',
                prename: 'Vorname',
                gender: 'Geschlecht',
                result: 'Leistung',
                points: 'Punkte',
                distance: 'Distanz',
            },
            status: {
                noGroups: 'Keine Gruppen mit Wettkämpfer vorhanden',
            },
        },
    },

    alert: {
        great: 'Super!',
        info: 'Information!',
        attention: 'Achtung!',
        warning: 'Warnung!',
        error: 'Fehler!',
    },

    page: {
        groups: 'Gruppen',
        group: 'Gruppe {{ name }}',
        participantList: 'Teilnehmerlisten',
        athletics: 'Leichtathletik',
        eventSheets: 'Wettkampfblätter',
        results: 'Resultate',
        ranking: 'Ranglisten',
        management: 'Verwaltung',
    },

    form: {
        validation: {
            required: 'Dieses Feld wird benötigt',
        },
        action: {
            abort: 'Abbrechen',
            save: 'Speichern',
            edit: 'Bearbeiten',
        },
    },

    label: {
        notDefined: 'N/A',
    },

    module: {
        confirmation: {
            confirm: 'Bestätigen',
        },
    },

    error: {
        noConnection: {
            title: 'Keine Verbindung zum Server :(',
            text: 'Sporttag PSA kann keine Verbindung mit dem Server aufnehmen. Versuchen Sie es später noch einmal. Sollte das Problem weiterhin bestehen wenden Sie sich an den Administrator.',
            action: 'Erneut versuchen',
        },
        notFound: {
            title: '404 Seite nicht gefunden',
            text: 'Die Seite welche Sie aufrufen wollen existiert nicht.',
            action: 'Zum Home',
        },
    },

    // direct translations from a enum or a fix value in the application
    MALE: 'Männlich',
    FEMALE: 'Weiblich',
    athletics: 'Leichtathletik',
};
