import { useState } from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    TextInput,
    rem,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import React from 'react';

const useStyles = createStyles((theme) => ({
    table: {
        padding: rem(10),
    },
    th: {
        padding: '0 !important',
    },

    control: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
}));

interface RowData {
    name: string;
    email: string;
    company: string;
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size="0.9rem" stroke={1.5} />
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(
    data: any[],
    { sortBy, reversed, search }: { sortBy: any; reversed: boolean; search: any; }
  ) {
    const query = search.toLowerCase().trim();
  
    if (!sortBy) {
      return data.filter((item: { [x: string]: { toString: () => string; }; }) =>
        Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(query))
      );
    }
  
    return data
      .slice()
      .sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
  
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          if (reversed) {
            return bVal.localeCompare(aVal);
          }
          return aVal.localeCompare(bVal);
        } else if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (reversed) {
            return bVal - aVal;
          }
          return aVal - bVal;
        } else {
          return 0;
        }
      })
      .filter((item: { [x: string]: { toString: () => string; }; }) =>
        Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(query))
      );
  }
  

export function TableSort({ data }) {
    const { classes } = useStyles();

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);
  
    const setSorting = (field: string | React.SetStateAction<null>) => {
      const reversed = field === sortBy ? !reverseSortDirection : false;
      setReverseSortDirection(reversed);
      setSortBy(field);
      setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };
  
    const handleSearchChange = (event: { currentTarget: { value: any; }; }) => {
      const { value } = event.currentTarget;
      setSearch(value);
      setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };
  
    const rows = sortedData.map((row: { name: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.Key | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; company: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
      <tr key={row.name}>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.company}</td>
      </tr>
    ));
  
    return (
      <ScrollArea  className={classes.table} >
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table horizontalSpacing="md" verticalSpacing="xs" sx={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'name'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('name')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'email'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('email')}
              >
                Email
              </Th>
              <Th
                sorted={sortBy === 'company'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('company')}
              >
                Company
              </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    );
  }
  