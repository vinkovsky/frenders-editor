import * as enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Настройка конфигурации тестирования с помощью Enzyme
enzyme.configure({ adapter: new Adapter() })
