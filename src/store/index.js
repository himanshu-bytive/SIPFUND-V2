import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer as AuthRedux } from './AuthRedux';
import { reducer as OwnerChoiceRedux } from './OwnerChoiceRedux';
import { reducer as CartActionsRedux } from './CartActionsRedux';
import { reducer as TransactionHisRedux } from './TransactionHisRedux';
import { reducer as RedemptionRedux } from './RedemptionRedux';
import { reducer as SwitchRedux } from './SwitchRedux';
import { reducer as RegistrationRedux } from './RegistrationRedux';
import { reducer as HomeRedux } from './HomeRedux';
import { reducer as TopRatedFundRedux } from './TopRatedFundRedux';
import { reducer as SideMenuRedux } from './SideMenuRedux';
import { reducer as InvestmentPlanRedux } from './InvestmentPlanRedux';
import { reducer as EkycRedux } from './EkycRedux';
import { reducer as EmandateRedux } from './EmandateRedux';
import { reducer as CheckoutRedux } from './CheckoutRedux';
import { reducer as GoalsRedux } from './GoalsRedux';
import { reducer as AddMoreFundsRedux } from './AddMoreFundsRedux';
import { reducer as ReportsRedux } from './ReportsRedux';
import { reducer as FundDetailRedux } from './FundDetailRedux';
import { reducer as PushNotificationRedux } from './PushNotificationRedux';
const config = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [
    ]
}
export default persistCombineReducers(config, {
    auth: AuthRedux,
    registration: RegistrationRedux,
    home: HomeRedux,
    toprated: TopRatedFundRedux,
    sideMenu: SideMenuRedux,
    ownerChoice: OwnerChoiceRedux,
    cartActions: CartActionsRedux,
    transactionHis: TransactionHisRedux,
    redemption: RedemptionRedux,
    switch: SwitchRedux,
    investmentplan: InvestmentPlanRedux,
    ekyc: EkycRedux,
    emandate: EmandateRedux,
    checkout: CheckoutRedux,
    goals: GoalsRedux,
    addmorefunds: AddMoreFundsRedux,
    reports: ReportsRedux,
    fundDetail: FundDetailRedux,
    notification: PushNotificationRedux,

});