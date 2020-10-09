# Change Log

All notable changes to this project will be documented in this file.

## 1.2.1 - 2020-10-09

-   Restore proper util behavior when callback switches between func and undefined

## 1.2.0 - 2020-09-17

-   Solve frequent invalidation of useCallback functions due to callback prop changes

## 1.1.1 - 2020-07-18

-   Improve performance of useOutsideEvent hook

## 1.1.0 - 2020-02-28

-   Add ref forwarding for OutsideEventControlled
-   Allow to pass no callback with no side effects fired
-   Fix bugs with loosing outside clicks on next event after event.stopPropagation
-   Prevent recreating handler if nested function passed
-   Improve readme
-   Add comments to props and parameters

## 1.0.1 - 2020-06-06

-   Remove sources and excess files

## 1.0.0 - 2020-06-06

-   First version
