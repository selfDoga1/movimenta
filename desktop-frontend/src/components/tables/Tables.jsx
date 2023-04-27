import { Table } from 'antd';
import Column from 'antd/es/table/Column';

// - - - external - - \\
import UserTable from './UserTable'
import WorkoutTable from './WorkoutTable'

const WorkoutRoutinesTable = (props) => (
    <div>
        {props.topContent}
        <Table 
            dataSource={props.dataSource} 
            tableLayout='auto'
            pagination={{ defaultPageSize: 5 }}
        >
            <Column title='Workout' dataIndex={['workout', 'name']} key='workout' responsive={['lg']}/>
            <Column title='Series' dataIndex='series' key='routine' responsive={['sm']}/>
            <Column title='Repetitions' dataIndex='repetitions' key='routine' responsive={['sm']}/>
        </Table>
    </div>
);

const RoutinesTable = (props) => (
    <div>
        {props.topContent}
        <Table 
            dataSource={props.dataSource} 
            tableLayout='auto'
            pagination={{ defaultPageSize: 5 }}
        >
            <Column title='Name' dataIndex='name' key='name' responsive={['lg']}/>
            <Column title='Date' dataIndex='date_created' key='date_created' responsive={['md']}/>
            <Column title='Action' key='action' dataIndex='id' responsive={['md']} render={(dataIndex) => props.actionRender(dataIndex)}/>
        </Table>
    </div>
);

export { UserTable, WorkoutRoutinesTable, RoutinesTable, WorkoutTable };