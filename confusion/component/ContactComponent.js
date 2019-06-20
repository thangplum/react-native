import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

class Contact extends Component {
    static navigationOptions = {
        title: 'Contact'
    }
    render() {
        return (
            <Card title="Contact Information">
                <View>
                    <Text>
                        121, Clear Water Bay Road
                    </Text>
                </View>
                <View>
                    <Text>
                        Clear Water Bay, Kowloon 
                    </Text>
                </View>
                <View>
                    <Text>
                        HONG KONG 
                    </Text>
                </View>
                <View>
                    <Text>
                        Tel: +852 1234 5678 
                    </Text>
                </View>
                <View>
                    <Text>
                        Fax: +852 8765 4321
                    </Text>
                </View>
                <View>
                    <Text>
                        Email:confusion@food.net
                    </Text>
                </View>
            </Card>
            
        )
    }
}

export default Contact;