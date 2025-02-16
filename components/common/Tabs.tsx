import type React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native'

type Tab = {
  id: string
  label: string
}

type TabsProps = {
  tabs: Tab[]
  activeTab: string
  onTabPress: (id: string) => void
  containerStyle?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  activeTabStyle?: StyleProp<ViewStyle>
  tabTextStyle?: StyleProp<TextStyle>
  activeTabTextStyle?: StyleProp<TextStyle>
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabPress,
  containerStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
}) => {
  return (
    <View style={[styles.tabsContainer, containerStyle]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            tabStyle,
            activeTab === tab.id && styles.activeTab,
            activeTab === tab.id && activeTabStyle,
          ]}
          onPress={() => onTabPress(tab.id)}>
          <Text
            style={[
              styles.tabText,
              tabTextStyle,
              activeTab === tab.id && styles.activeTabText,
              activeTab === tab.id && activeTabTextStyle,
            ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 25,
    padding: 4,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#B5AD6F',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
    fontFamily: 'MyriadPro',
  },
  activeTabText: {
    color: 'white',
    fontSize: 14,
  },
})

export default Tabs
