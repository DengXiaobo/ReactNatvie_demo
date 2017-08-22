/**
 * Created by linlijun on 2017/5/19.
 */
/**
 * Created by linlijun on 2017/5/19.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    AsyncStorage,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabNavigator, StackNavigator} from "react-navigation";
import Accuont from './Account/account'
import Edit from './Edit/edit'
import List from './List/list'
import Picture from './Picture/picture'
import Detail from './List/detail'
import Login from './Account/login'
import EditInfo from './Account/editinfo'

console.ignoredYellowBox = ['Warning: View.propTypes'];//屏蔽掉react-navigation:'View.propTypes has been deprecated'的警告
console.ignoredYellowBox = ['Warning: BackAndroid'];
export default class App extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            logined : false,
            user : null,
        };
      }

    componentDidMount() {
        this.asyncGetAppStatus();
    }

    render() {
        if (!this.state.logined){
            return(
                <Login finishLoginHandler = {this.finishLoginHandler}/>
            );
        }
        return (
            <ListNav/>
        );
    }

    finishLoginHandler = (user) => {
        //user是一个用户信息的对象
        console.log(user);
        let user2 = JSON.stringify(user);
        AsyncStorage.setItem('user', user2)
            .then(
                ()=> {
                    this.setState({
                            logined: true,
                            user: user
                        }
                    );
                }
            )
            .catch((err)=> {
                alert(err);
            });
    }

    asyncGetAppStatus = ()=>{
        AsyncStorage.getItem('user')
            .then(
                (data)=> {
                    let user;
                    let newState = {};
                    if (data) {
                        user = JSON.parse(data);
                    }

                    if (user && user.accessToken) {
                        newState.logined = true;
                        newState.user = user;
                    } else {
                        newState.logined = false;
                    }

                    this.setState(newState);
                }
            )
            .catch((err)=> {
                alert(err);
            });
    }
}

const MainTab = TabNavigator({
        Home: {
            screen: List,
            navigationOptions: {
                tabBarLabel: '视频',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons name="ios-videocam" size={25} color={tintColor}/>
                ),
            }
        },
        Edit: {
            screen: Edit,
            navigationOptions: {
                tabBarLabel: '录制',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons name="ios-recording" size={25} color={tintColor}/>
                ),
            }
        },
        Picture: {
            screen: Picture,
            navigationOptions: {
                tabBarLabel: '图片',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons name="ios-images" size={25} color={tintColor}/>
                ),
            }
        },
        Accuont: {
            screen: Accuont,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons name="ios-person" size={25} color={tintColor}/>
                ),
            }
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,//添加手势拖动切换
        animationEnabled: false,//添加切换动画
        lazy: true,//是否启动懒加载
        initialRouteName: 'Home',
        tabBarOptions: {
            style: {
                height: 49,
                backgroundColor: 'white'
            },
            activeBackgroundColor: 'white',
            activeTintColor: 'orange',
            // inactiveBackgroundColor:'white',
            inactiveTintColor: 'rgb(180,180,180)',
            showIcon: true,
            showLabel: true,
            iconStyle: {
                height: (Platform.OS === 'ios') ? 25 : 22
            },
            labelStyle: {
                marginTop: 2,
            },
            indicatorStyle: {
                height: 0
            }
        }
    }
);


const ListNav = StackNavigator({
        Home: {screen: MainTab},
        Detail: {screen: Detail},
        EditInfo:{screen: EditInfo}
    },
    {
        initialRouteName: 'Home',
        mode: 'card',// 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        onTransitionStart: ()=> {
        },
        onTransitionEnd: ()=> {
        },
        navigationOptions: {
            headerBackTitle: '返回',
            tabBarVisible: false,
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:'rgb(225,110,83)'
            }
        }
    });