// Copyright Contributors to the Amundsen project.
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { mount } from 'enzyme';
import { mocked } from 'ts-jest/utils';

import TestDataBuilder from './testDataBuilder';
import Table, { TableProps } from '.';

const dataBuilder = new TestDataBuilder();

const formatChildrenDataMock = jest
  .fn()
  .mockImplementation((rowValue) => ({ key: rowValue.key }));

const setup = (propOverrides?: Partial<TableProps>) => {
  const { data, columns } = dataBuilder.build();
  const props = {
    data,
    columns,
    ...propOverrides,
  };
  const wrapper = mount<TableProps>(<Table {...props} />);

  return { props, wrapper };
};

describe('Table', () => {
  describe('render', () => {
    it('renders without issues', () => {
      expect(() => {
        setup();
      }).not.toThrow();
    });

    describe('data', () => {
      describe('when empty data is passed', () => {
        const { columns, data } = dataBuilder.withEmptyData().build();

        it('renders a table', () => {
          const { wrapper } = setup({
            data,
            columns,
          });
          const expected = 1;
          const actual = wrapper.find('.ams-table').length;

          expect(actual).toEqual(expected);
        });

        describe('table header', () => {
          it('renders a table header', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-header').length;

            expect(actual).toEqual(expected);
          });

          it('renders one cell inside the header', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = 1;
            const actual = wrapper.find(
              '.ams-table-header .ams-table-heading-cell'
            ).length;

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders a table body', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-body').length;

            expect(actual).toEqual(expected);
          });

          it('renders one row', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-row').length;

            expect(actual).toEqual(expected);
          });

          it('renders an empty message', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = 1;
            const actual = wrapper.find(
              '.ams-table-row .ams-empty-message-cell'
            ).length;

            expect(actual).toEqual(expected);
          });
        });
      });

      describe('when simple data is passed', () => {
        it('renders a table', () => {
          const { wrapper } = setup();
          const expected = 1;
          const actual = wrapper.find('.ams-table').length;

          expect(actual).toEqual(expected);
        });

        describe('table header', () => {
          it('renders a table header', () => {
            const { wrapper } = setup();
            const expected = 1;
            const actual = wrapper.find('.ams-table-header').length;

            expect(actual).toEqual(expected);
          });

          it('renders a three cells inside the header', () => {
            const { wrapper } = setup();
            const expected = 3;
            const actual = wrapper.find(
              '.ams-table-header .ams-table-heading-cell'
            ).length;

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders a table body', () => {
            const { wrapper } = setup();
            const expected = 1;
            const actual = wrapper.find('.ams-table-body').length;

            expect(actual).toEqual(expected);
          });

          it('renders three rows', () => {
            const { wrapper } = setup();
            const expected = 3;
            const actual = wrapper.find('.ams-table-row').length;

            expect(actual).toEqual(expected);
          });

          it('renders nine cells', () => {
            const { wrapper } = setup();
            const expected = 9;
            const actual = wrapper.find('.ams-table-row .ams-table-cell')
              .length;

            expect(actual).toEqual(expected);
          });
        });
      });

      describe('when more data than columns', () => {
        const { columns, data } = dataBuilder.withMoreDataThanColumns().build();

        describe('table header', () => {
          it('renders a three cells inside the header', () => {
            const { wrapper } = setup({ columns, data });
            const expected = 3;
            const actual = wrapper.find(
              '.ams-table-header .ams-table-heading-cell'
            ).length;

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders four rows', () => {
            const { wrapper } = setup({ columns, data });
            const expected = 4;
            const actual = wrapper.find('.ams-table-row').length;

            expect(actual).toEqual(expected);
          });

          it('renders twelve cells', () => {
            const { wrapper } = setup({ columns, data });
            const expected = 12;
            const actual = wrapper.find('.ams-table-row .ams-table-cell')
              .length;

            expect(actual).toEqual(expected);
          });
        });
      });
    });

    describe('columns', () => {
      describe('when horizontal alignment is passed', () => {
        const { columns, data } = dataBuilder.withAlignedColumns().build();

        describe('table header', () => {
          it('renders the first column as left aligned', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = true;
            const actual = wrapper
              .find('.ams-table-header .ams-table-heading-cell')
              .at(0)
              .hasClass('is-left-aligned');

            expect(actual).toEqual(expected);
          });

          it('renders the second column as center aligned', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = true;
            const actual = wrapper
              .find('.ams-table-header .ams-table-heading-cell')
              .at(1)
              .hasClass('is-center-aligned');

            expect(actual).toEqual(expected);
          });

          it('renders the third column as right aligned', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = true;
            const actual = wrapper
              .find('.ams-table-header .ams-table-heading-cell')
              .at(2)
              .hasClass('is-right-aligned');

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders the first column as left aligned', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = true;
            const actual = wrapper
              .find('.ams-table-body .ams-table-cell')
              .at(0)
              .hasClass('is-left-aligned');

            expect(actual).toEqual(expected);
          });

          it('renders the second column as center aligned', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = true;
            const actual = wrapper
              .find('.ams-table-body .ams-table-cell')
              .at(1)
              .hasClass('is-center-aligned');

            expect(actual).toEqual(expected);
          });

          it('renders the first column as right aligned', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = true;
            const actual = wrapper
              .find('.ams-table-body .ams-table-cell')
              .at(2)
              .hasClass('is-right-aligned');

            expect(actual).toEqual(expected);
          });
        });
      });

      describe('when column width is passed', () => {
        const { columns, data } = dataBuilder.withFixedWidthColumns().build();

        describe('table header', () => {
          it('renders the first column as a 50px column', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = '50px';
            const actual = wrapper
              .find('.ams-table-header .ams-table-heading-cell')
              .get(0).props.style.width;

            expect(actual).toEqual(expected);
          });

          it('renders the second column as a 200px column', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = '200px';
            const actual = wrapper
              .find('.ams-table-header .ams-table-heading-cell')
              .get(1).props.style.width;

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders the first column as a 50px column', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = '50px';
            const actual = wrapper
              .find('.ams-table-body .ams-table-cell')
              .get(0).props.style.width;

            expect(actual).toEqual(expected);
          });

          it('renders the second column as a 200px column', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = '200px';
            const actual = wrapper
              .find('.ams-table-body .ams-table-cell')
              .get(1).props.style.width;

            expect(actual).toEqual(expected);
          });
        });
      });

      describe('when components are passed', () => {
        describe('when one component', () => {
          const {
            columns,
            data,
          } = dataBuilder.withOneComponentColumn().build();

          describe('table body', () => {
            it('renders the first column as a component wrapped value', () => {
              const { wrapper } = setup({
                data,
                columns,
              });
              const expected = data.length;
              const actual = wrapper.find(
                '.ams-table-body .ams-table-cell strong'
              ).length;

              expect(actual).toEqual(expected);
            });
          });
        });

        describe('when multiple components per cell', () => {
          const {
            columns,
            data,
          } = dataBuilder.withMultipleComponentsColumn().build();

          describe('table body', () => {
            it('renders the first column as a component wrapped value', () => {
              const { wrapper } = setup({
                data,
                columns,
              });
              const expected = 6;
              const actual = wrapper.find(
                '.ams-table-body .ams-table-cell strong'
              ).length;

              expect(actual).toEqual(expected);
            });
          });
        });
      });

      describe('when columns specify fields not in the data', () => {
        const { columns, data } = dataBuilder.withWrongData().build();

        beforeEach(() => {
          jest.spyOn(console, 'error');
          mocked(console.error).mockImplementation(jest.fn);
        });

        afterEach(() => {
          mocked(console.error).mockRestore();
        });

        it('throws an error', () => {
          expect(() => {
            setup({
              data,
              columns,
            });
          }).toThrow();
        });
      });
    });

    describe('options', () => {
      describe('when a tableClassName is passed', () => {
        it('adds the class to the table', () => {
          const { wrapper } = setup({
            options: { tableClassName: 'test-class' },
          });
          const expected = 1;
          const actual = wrapper.find('.test-class').length;

          expect(actual).toEqual(expected);
        });
      });

      describe('when a rowHeight is passed', () => {
        it('adds the styling to the rows', () => {
          const { wrapper } = setup({
            options: { rowHeight: 20 },
          });
          const expected = { height: '20px' };
          const actual = wrapper.find('.ams-table-row').get(0).props.style;

          expect(actual).toEqual(expected);
        });
      });

      describe('when isLoading is active', () => {
        it('renders a table', () => {
          const { wrapper } = setup({
            data: [],
            columns: [],
            options: {
              isLoading: true,
              numLoadingBlocks: 10,
            },
          });
          const expected = 1;
          const actual = wrapper.find('.ams-table').length;

          expect(actual).toEqual(expected);
        });

        describe('table header', () => {
          it('renders a table header', () => {
            const { wrapper } = setup({
              data: [],
              columns: [],
              options: {
                isLoading: true,
              },
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-header').length;

            expect(actual).toEqual(expected);
          });

          it('renders one cell inside the header', () => {
            const { wrapper } = setup({
              data: [],
              columns: [],
              options: {
                isLoading: true,
                numLoadingBlocks: 10,
              },
            });
            const expected = 1;
            const actual = wrapper.find(
              '.ams-table-header .ams-table-heading-loading-cell'
            ).length;

            expect(actual).toEqual(expected);
          });

          it('renders one loading block inside the header', () => {
            const { wrapper } = setup({
              data: [],
              columns: [],
              options: {
                isLoading: true,
                numLoadingBlocks: 10,
              },
            });
            const expected = 1;
            const actual = wrapper.find(
              '.ams-table-header .ams-table-shimmer-block'
            ).length;

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders a table body', () => {
            const { wrapper } = setup({
              data: [],
              columns: [],
              options: {
                isLoading: true,
                numLoadingBlocks: 10,
              },
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-body').length;

            expect(actual).toEqual(expected);
          });

          it('renders one row', () => {
            const { wrapper } = setup({
              data: [],
              columns: [],
              options: {
                isLoading: true,
                numLoadingBlocks: 10,
              },
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-row').length;

            expect(actual).toEqual(expected);
          });

          it('renders the proper number of shimmering blocks', () => {
            const numOfLoadingBlocks = 10;
            const { wrapper } = setup({
              data: [],
              columns: [],
              options: {
                isLoading: true,
                numLoadingBlocks: numOfLoadingBlocks,
              },
            });
            const expected = numOfLoadingBlocks;
            const actual = wrapper.find(
              '.ams-table-row .shimmer-resource-loader-item'
            ).length;

            expect(actual).toEqual(expected);
          });
        });
      });

      describe('when a row is expandable', () => {
        const { columns, data } = dataBuilder.withCollapsedRow().build();

        describe('table header', () => {
          it('renders a table header', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-header').length;

            expect(actual).toEqual(expected);
          });

          it('renders the same amount of cells equal to columns length inside the header', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = columns.length;
            const actual = wrapper.find(
              '.ams-table-header .ams-table-heading-cell'
            ).length;

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders expansion buttons for rows that are expandable', () => {
            const { wrapper } = setup({
              data,
              columns,
            });
            const expected = data.filter((item) => item.isExpandable === true)
              .length;
            const actual = wrapper.find(
              '.ams-table-body .ams-table-expanding-button'
            ).length;

            expect(actual).toEqual(expected);
          });

          describe('expanded row', () => {
            it('renders hidden by default', () => {
              const { wrapper } = setup({
                data,
                columns,
              });
              const expected = data.length;
              const actual = wrapper.find('.ams-table-body .ams-table-row')
                .length;

              expect(actual).toEqual(expected);
            });
          });
        });
      });

      describe('when emptyMessage is passed', () => {
        const { columns, data } = dataBuilder.withEmptyData().build();
        const TEST_EMPTY_MESSAGE = 'Test Empty Message';

        describe('table header', () => {
          it('renders one cell inside the header', () => {
            const { wrapper } = setup({
              data,
              columns,
              options: {
                emptyMessage: TEST_EMPTY_MESSAGE,
              },
            });
            const expected = 1;
            const actual = wrapper.find(
              '.ams-table-header .ams-table-heading-cell'
            ).length;

            expect(actual).toEqual(expected);
          });
        });

        describe('table body', () => {
          it('renders one row', () => {
            const { wrapper } = setup({
              data,
              columns,
              options: {
                emptyMessage: TEST_EMPTY_MESSAGE,
              },
            });
            const expected = 1;
            const actual = wrapper.find('.ams-table-row').length;

            expect(actual).toEqual(expected);
          });

          it('renders the custom empty message', () => {
            const { wrapper } = setup({
              data,
              columns,
              options: {
                emptyMessage: TEST_EMPTY_MESSAGE,
              },
            });
            const expected = TEST_EMPTY_MESSAGE;
            const actual = wrapper
              .find('.ams-table-row .ams-empty-message-cell')
              .text();

            expect(actual).toEqual(expected);
          });
        });
      });

      describe('when currentSelectedKey is passed', () => {
        it('adds the selected row styling to the selected row', () => {
          const { wrapper } = setup({
            options: {
              currentSelectedKey: 'database://cluster.schema/table/rowName',
            },
          });
          const expected = 'ams-table-row  is-selected-row';
          const actual = wrapper
            .find('.ams-table-row')
            .get(0)
            .props.className.trim();

          expect(actual).toEqual(expected);
        });

        it('does not add the selected row styling to a non selected row', () => {
          const { wrapper } = setup({
            options: {
              currentSelectedKey: 'database://cluster.schema/table/rowName',
            },
          });
          const expected = 'ams-table-row';
          const actual = wrapper
            .find('.ams-table-row')
            .get(1)
            .props.className.trim();

          expect(actual).toEqual(expected);
        });
      });

      describe('when preExpandPanelKey is passed', () => {
        const { columns, data } = dataBuilder.withCollapsedRow().build();
        const preExpandRightPanelSpy = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = jest.fn();

        it('preexpands the row that corresponds to the key', () => {
          const { wrapper } = setup({
            data,
            columns,
            options: {
              tableKey: 'database://cluster.schema/table',
              preExpandPanelKey: 'database://cluster.schema/table/rowName',
              preExpandRightPanel: preExpandRightPanelSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });

          // The first row has two child rows when preexpanded
          const expected = data.length + 2;
          const actual = wrapper.find('.ams-table-body .ams-table-row').length;

          expect(actual).toEqual(expected);
        });

        it('preexpands the row and all the parent rows that correspond to the key', () => {
          const { wrapper } = setup({
            data,
            columns,
            options: {
              tableKey: 'database://cluster.schema/table',
              preExpandPanelKey:
                'database://cluster.schema/table/rowName/type/rowName/col1',
              preExpandRightPanel: preExpandRightPanelSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });

          // The first row has two child rows when preexpanded
          const expected = data.length + 2;
          const actual = wrapper.find('.ams-table-body .ams-table-row').length;

          expect(actual).toEqual(expected);
        });
      });
    });
  });

  describe('lifetime', () => {
    describe('when expanding and collapsing rows', () => {
      const { columns, data } = dataBuilder.withCollapsedRow().build();

      describe('when clicking on expand button', () => {
        it('shows the expanded rows', () => {
          const { wrapper } = setup({
            data,
            columns,
            options: {
              formatChildrenData: formatChildrenDataMock,
            },
          });
          // The first row has two child rows when expanded
          const expected = data.length + 2;

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');

          const actual = wrapper.find('.ams-table-body .ams-table-row').length;

          expect(actual).toEqual(expected);
        });

        describe('when clicking again', () => {
          it('hides the expand row', () => {
            const { wrapper } = setup({
              data,
              columns,
              options: {
                formatChildrenData: formatChildrenDataMock,
              },
            });
            const expected = data.length;

            wrapper
              .find('.ams-table-body .ams-table-expanding-button')
              .at(0)
              .simulate('click')
              .simulate('click');

            const actual = wrapper.find('.ams-table-body .ams-table-row')
              .length;

            expect(actual).toEqual(expected);
          });
        });
      });

      describe('when clicking on multiple expand buttons', () => {
        it('shows all the expanded rows', () => {
          const { wrapper } = setup({
            data,
            columns,
            options: {
              formatChildrenData: formatChildrenDataMock,
            },
          });
          // The first two rows have four total child rows when both expanded
          const expected = data.length + 4;

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');
          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(1)
            .simulate('click');

          const actual = wrapper.find('.ams-table-body .ams-table-row').length;

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('when onExpand is passed', () => {
      const { columns, data } = dataBuilder.withCollapsedRow().build();
      describe('when clicking on expand button', () => {
        it('calls the onExpand handler', () => {
          const onExpandSpy = jest.fn();
          const { wrapper } = setup({
            data,
            columns,
            options: {
              onExpand: onExpandSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });
          const expected = 1;

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');

          const actual = onExpandSpy.mock.calls.length;

          expect(actual).toEqual(expected);
        });

        it('calls the onExpand handler with the row values and the key', () => {
          const onExpandSpy = jest.fn();
          const { wrapper } = setup({
            data,
            columns,
            options: {
              onExpand: onExpandSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });
          const expected = [data[0], data[0].key];

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');

          const [actual] = onExpandSpy.mock.calls;
          expect(actual).toEqual(expected);
        });
      });

      describe('when clicking on multiple expand buttons', () => {
        it('calls the onExpand handler several times', () => {
          const onExpandSpy = jest.fn();
          const { wrapper } = setup({
            data,
            columns,
            options: {
              onExpand: onExpandSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });
          const expected = 2;

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');
          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(1)
            .simulate('click');

          const actual = onExpandSpy.mock.calls.length;

          expect(actual).toEqual(expected);
        });
      });

      describe('when clicking a second time on the expand button', () => {
        it('does not call the onExpand handler', () => {
          const onExpandSpy = jest.fn();
          const { wrapper } = setup({
            data,
            columns,
            options: {
              onExpand: onExpandSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });
          const expected = 1;

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');
          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');

          const actual = onExpandSpy.mock.calls.length;

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('when onCollapse is passed', () => {
      const { columns, data } = dataBuilder.withCollapsedRow().build();

      describe('when clicking on expand button', () => {
        it('does not call the onCollapse handler', () => {
          const onCollapseSpy = jest.fn();
          const { wrapper } = setup({
            data,
            columns,
            options: {
              onCollapse: onCollapseSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });
          const expected = 0;

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');

          const actual = onCollapseSpy.mock.calls.length;

          expect(actual).toEqual(expected);
        });
      });

      describe('when clicking a second time on the expand button', () => {
        it('calls the onCollapse handler', () => {
          const onCollapseSpy = jest.fn();
          const { wrapper } = setup({
            data,
            columns,
            options: {
              onCollapse: onCollapseSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });
          const expected = 1;

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');
          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');

          const actual = onCollapseSpy.mock.calls.length;

          expect(actual).toEqual(expected);
        });

        it('calls the onCollapse handler with the row values and the key', () => {
          const onCollapseSpy = jest.fn();
          const { wrapper } = setup({
            data,
            columns,
            options: {
              onCollapse: onCollapseSpy,
              formatChildrenData: formatChildrenDataMock,
            },
          });
          const expected = [data[0], data[0].key];

          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');
          wrapper
            .find('.ams-table-body .ams-table-expanding-button')
            .at(0)
            .simulate('click');

          const [actual] = onCollapseSpy.mock.calls;

          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
