import React, { PureComponent } from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { connect } from 'react-redux';

import { stackNavigator } from './nameNavigator';
import BottomTabNavigator from './bottomTabNavigator';
import DrawerNavigator from './drawerNavigator';

import
{
    Step,
    StepMaps,
    Profile,
    SpendingWallet,
    WalletNew,
    WalletExport,
    Trade,
    ProfileDetails,
    ProfileEditEmail,
    ProfileEditName,
    ProfileEditGend,
    ProfileEditPasswd,
    ProfileDelete,
    ProfileActivationCode,
    ProfileRunningRecord,
    ProfilePassCode,
    ProfileCongrats,
    ProfileShare,
    WalletImport,
    WalletPasscode,
    Transfer,
    WalletHome,
    WalletCoin,
    WalletSettings,
    ProfileChangePass,
    SendTo,
    RestoreWallet,
    BackupWallet,
    Swap,
    LoginSignup,
    LoginActiveCode,
    Recvice,
    Countdown,
    passcodeBackup,
    
} from '../container';

import Feedback from '../container/Feedback'

const Stack = createNativeStackNavigator();

class MainNavigator extends PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
        return (
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={stackNavigator.DRAWER}>
                <Stack.Screen name={stackNavigator.DRAWER} component={DrawerNavigator} />

                <Stack.Screen
                    name={stackNavigator.BOTTOM_TAB}
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name={stackNavigator.STEP} component={Step} />
                <Stack.Screen name={stackNavigator.STEP_MAPS} component={StepMaps} />
                {/* WALLET */}
                <Stack.Screen name={stackNavigator.SPENDING_WALLET} component={SpendingWallet} />
                <Stack.Screen name={stackNavigator.WALLET_NEW} component={WalletNew} />
                <Stack.Screen name={stackNavigator.WALLET_EXPORT} component={WalletExport} />
                <Stack.Screen name={stackNavigator.WALLET_IMPORT} component={WalletImport} />
                <Stack.Screen name={stackNavigator.WALLET_PASSCODE} component={WalletPasscode} />
                <Stack.Screen name={stackNavigator.TRADE} component={Trade} />

                {/* PROFILE */}
                <Stack.Screen name={stackNavigator.PROFILE} component={Profile} />
                <Stack.Screen name={stackNavigator.PROFILE_DETAILS} component={ProfileDetails} />
                <Stack.Screen
                    name={stackNavigator.PROFILE_EDIT_EMAIL}
                    component={ProfileEditEmail}
                />
                <Stack.Screen name={stackNavigator.PROFILE_EDIT_NAME} component={ProfileEditName} />
                <Stack.Screen name={stackNavigator.PROFILE_EDIT_GEND} component={ProfileEditGend} />
                <Stack.Screen
                    name={stackNavigator.PROFILE_EDIT_PASSWORD}
                    component={ProfileEditPasswd}
                />
                <Stack.Screen name={stackNavigator.PROFILE_DELETE} component={ProfileDelete} />
                <Stack.Screen
                    name={stackNavigator.PROFILE_ACTIVATIONCODE}
                    component={ProfileActivationCode}
                />
                <Stack.Screen
                    name={stackNavigator.PROFILE_RUNNING_RECORD}
                    component={ProfileRunningRecord}
                />
                <Stack.Screen name={stackNavigator.PROFILE_CONGRATS} component={ProfileCongrats} />
                <Stack.Screen name={stackNavigator.PROFILE_SHARE} component={ProfileShare} />

                <Stack.Screen name={stackNavigator.ROFILE_PASS_CODE} component={ProfilePassCode} />
                <Stack.Screen name={stackNavigator.TRANSFER} component={Transfer} />
                <Stack.Screen name={stackNavigator.WALLET_HOME} component={WalletHome} />
                <Stack.Screen name={stackNavigator.WALLET_COIN} component={WalletCoin} />
                <Stack.Screen name={stackNavigator.WALLET_SETTINGS} component={WalletSettings} />
                <Stack.Screen
                    name={stackNavigator.ROFILE_CHANGE_PASS}
                    component={ProfileChangePass}
                />
                <Stack.Screen name={stackNavigator.SEND_TO} component={SendTo} />
                <Stack.Screen name={stackNavigator.RESTORE_WALLET} component={RestoreWallet} />
                <Stack.Screen name={stackNavigator.BACKUP_WALLET} component={BackupWallet} />
                <Stack.Screen name={stackNavigator.SWAP} component={Swap} />

                <Stack.Screen name={stackNavigator.RECVICE} component={Recvice} />

                <Stack.Screen name={stackNavigator.COUNT_DOWN} component={Countdown} />
                <Stack.Screen name={stackNavigator.BACKUP_PASS_WALLET} component={passcodeBackup} />
                <Stack.Screen name={stackNavigator.FEED_BACK} component={Feedback} />
            </Stack.Navigator>
        );
    }
}

// export default MainNavigator;
const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
